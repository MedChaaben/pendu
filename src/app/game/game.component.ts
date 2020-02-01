import { Component, HostListener, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

const MIN_LENGTH = 6;
const MAX_LENGTH = 10;
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  nickname: string;
  letters: Array<string> = LETTERS;
  word: string;
  hiddenWord: Array<string>;
  chancesTotal: number;
  wrongResponse: number;
  keyboardDisabled: {};

  constructor(private loginService: LoginService) {}

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key.toUpperCase();
    if (this.letters.indexOf(key) > -1) { // check if letter is permitted
      this.choose(key);
    }
  }

  randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  ngOnInit(): void {
    this.nickname = this.loginService.nickname.getValue();
    this.resetGame();
  }

  resetGame(): void {
    this.chancesTotal = 13;
    this.wrongResponse = 0;
    this.word = this.randomize(this.randomIntFromInterval(MIN_LENGTH, MAX_LENGTH));
    this.keyboardDisabled = {};
  }

  randomize(wordLength: number): string {
    let randomWord = '';
    this.hiddenWord = [];
    for (let i = 0; i < wordLength; i++) {
      this.hiddenWord.push('_');
      const ind = Math.floor(Math.random() * Math.floor(this.letters.length));
      randomWord += this.letters[ind];
    }
    console.log(randomWord);
    return randomWord;
  }

  choose(letter): void {
    this.keyboardDisabled[letter] = true; // disable clicked button
    const indexes = this.getIndexes(letter); // get all indexes of letter in the chosen word
    if (indexes.length > 0) { // replace correct hidden letter
      indexes.forEach((index: number) => this.hiddenWord[index] = letter);
    } else { // increment wrong response
      this.wrongResponse++;
    }
    // end game
    if ((this.wrongResponse === this.chancesTotal) || (this.hiddenWord.join('') === this.word)) {
      this.disableKeyboard();
    }
  }

  // get an array of all indexes
  getIndexes(letter): Array<number> {
    const indexes = [];
    let pos = 0;
    let ind = this.word.indexOf(letter, pos);
    while (ind > -1) {
      indexes.push(ind);
      pos = ind + 1;
      ind = this.word.indexOf(letter, pos);
    }
    return indexes;
  }

  disableKeyboard(): void {
    this.letters.map((letter) => this.keyboardDisabled[letter] = true);
  }

  logout(): void {
    this.loginService.logout();
  }

}
