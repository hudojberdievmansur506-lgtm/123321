/**
 * Browser Speech Recognition wrapper for Russian language.
 * Checks compatibility and listens to children's speech.
 */

// Define Web Speech API types
interface IWindowWithSpeech extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export class SpeechRecognitionService {
  private recognition: any = null;
  private isSupported: boolean = false;
  private isListening: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const win = window as IWindowWithSpeech;
      const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.isSupported = true;
        try {
          this.recognition = new SpeechRecognition();
          this.recognition.lang = 'ru-RU';
          this.recognition.continuous = false;
          this.recognition.interimResults = false;
          this.recognition.maxAlternatives = 3;
        } catch {
          this.isSupported = false;
        }
      }
    }
  }

  public getSupported(): boolean {
    return this.isSupported;
  }

  public getIsListening(): boolean {
    return this.isListening;
  }

  public startListening(
    onResult: (transcript: string, isMatch: boolean) => void,
    onError: (errorMsg: string) => void,
    targetText?: string
  ) {
    if (!this.isSupported || !this.recognition) {
      onError('Голосовой ввод не поддерживается в этом браузере.');
      return;
    }

    try {
      this.recognition.abort();
    } catch {
      // Ignore
    }

    this.isListening = true;

    this.recognition.onstart = () => {
      this.isListening = true;
    };

    this.recognition.onresult = (event: any) => {
      this.isListening = false;
      const results = event.results;
      if (results && results[0] && results[0][0]) {
        const transcript = results[0][0].transcript.trim().toLowerCase();
        let isMatch = false;

        if (targetText) {
          const cleanTarget = targetText.toLowerCase().replace(/[^а-яё]/gi, '');
          const cleanTranscript = transcript.replace(/[^а-яё]/gi, '');
          
          // Check substring or distance match
          if (cleanTranscript.includes(cleanTarget) || cleanTarget.includes(cleanTranscript)) {
            isMatch = true;
          } else {
            // Also check alternatives
            for (let i = 0; i < results[0].length; i++) {
              const alt = results[0][i].transcript.trim().toLowerCase().replace(/[^а-яё]/gi, '');
              if (alt.includes(cleanTarget) || cleanTarget.includes(alt)) {
                isMatch = true;
                break;
              }
            }
          }
        }

        onResult(transcript, isMatch);
      }
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      let msg = 'Не удалось распознать речь. Попробуй ещё разок!';
      if (event.error === 'not-allowed') {
        msg = 'Микрофон отключён. Разрешите доступ к микрофону в браузере.';
      } else if (event.error === 'no-speech') {
        msg = 'Звук не услышан. Скажи погромче!';
      }
      onError(msg);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
    } catch (err: any) {
      this.isListening = false;
      onError('Ошибка запуска микрофона: ' + (err.message || 'попробуйте ещё раз'));
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {
        // Ignore
      }
    }
    this.isListening = false;
  }
}

export const speechService = new SpeechRecognitionService();
