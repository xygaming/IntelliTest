import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.textInput = React.createRef();
    this.items = React.createRef();
    this.itemWidth = React.createRef();
    this.options = React.createRef();
    this.pointer = 0;
    this.intellisense = this.intellisense.bind(this);
    this.intelliOptions = this.intelliOptions.bind(this);
    this.state = {
      listItems: undefined,
      inputed: undefined,
      options: ["print","open","prototype","example","applepie","bind","concatonate"],
    }
  }

  intellisense(e) {
    this.input = this.textInput.current.value;
    this.list = [];
    this.entryCommand = this.state.options;
    this.checker = [];
    
    // Filter method by unknown source. No source listed.
    this.entryCommand = this.entryCommand.filter((value, index) => this.entryCommand.indexOf(value) === index);
    console.log(this.input)

    this.entryCommand.sort();
    this.entryCommand.forEach(Element => this.checker.push(Element.split('')));
    this.checkInput = this.input.split('');

    for (let i = 0; i < this.checkInput.length; i++) {
        for (let j = 0; j < this.checker.length; j++) {
            if (this.checkInput.join('') === this.checker[j].splice(0, this.checkInput.length).join('')) {
                this.list.push(this.entryCommand[j]);
            }
        }
    }

    if (e.key === "ArrowDown") {
      if(this.list[0]) {
        this.pointer = this.pointer + 1;
      }
      if (this.pointer >= this.list.length) {
        this.pointer = 0;
      }
    }

    if (e.key === "Enter") {
      if(this.list[this.pointer]) {
        this.setInput(this.list[this.pointer]);
      } else if (this.list[0]) {
        this.setInput(this.list[0]);
      }
    }

    this.setState(
      {
        listItems: this.list.map(
          (item) => 
            <li key={item} className="items" ref={this.items}>
              <button
                className="select"
                onClick={() => this.setInput(item)}
              >
                {item}
              </button>
            </li>
        ),
        inputed: this.input,
      }
    );
    setTimeout(() => document.querySelectorAll(".select").forEach(Element => {if (Element.firstChild.textContent === this.list[this.pointer]) {Element.style.backgroundColor = '#80dfff'} else {Element.style.backgroundColor = 'white'}}), 0);
    setTimeout(() => document.querySelectorAll(".items").forEach(Element => Element.style.setProperty('--xvar', this.itemWidth.current.clientWidth.toString() + "px")), 0);
  }

  setInput(obj) {
    this.textInput.current.value = obj;
  }

  intelliOptions(e) {
    this.opInput = this.options.current.value;
    this.newOptions = this.opInput.split(', ');
    if (e.key === 'Enter' && !this.newOptions[this.newOptions.length - 1].split('').includes(',')) {
      this.temp = this.newOptions[this.newOptions.length - 1].split('');
      delete this.temp[this.temp.length - 1];
      this.newOptions[this.newOptions.length - 1] = this.temp.join('');
      this.setState({
        options: this.newOptions,
      });
      setTimeout(() => this.reStylingTextArea(), 0);
      console.log(this.state.options);
    } else if (e.key === 'Enter' && this.newOptions[this.newOptions.length - 1].split('').includes(',')) {
      alert("Please do not have a comma without a space in the last option!")
    }
  }

  render() {
    return (
      <div id="contain">
        <input
          type="text"
          ref={this.textInput}
          className="console"
          onKeyUp={
            (e) => this.intellisense(e)
          }
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />
        <ul id="intel">
          {this.state.listItems}
          <li className="items"></li>
        </ul>
        <br/>
        <div
          id="intel"
          className="test"
          ref={this.itemWidth}
        >
          {this.state.inputed}
        </div>
        <br/> <br/>
        <div id="opt">
          <div className='text'>
            <p>
              Insert new commands as you please. Hit <em>Enter</em> to set the options. Do not enter with just a comma at the end of the last item. Delete a line break if it happens. As this was a one day project, these statements do nothing. It is a test to see if I can recreate intellisense in ReactJS.
            </p>
          </div>
          <textarea
            ref={this.options}
            onKeyUp={
              (e) => this.intelliOptions(e)
            }
            autoCorrect="off"
            spellCheck="false"
            wrap="hard"
            rows="15"
            data-gramm_editor="false"
          ></textarea>
        </div>
      </div>
    );
  }

  componentDidMount() {
    setTimeout(() => this.reStylingTextArea(), 0);
  }

  reStylingTextArea() {
    this.optionView = this.state.options.map((item) => " " + item);
    this.temp = this.optionView[0].split('');
    delete this.temp[0];
    this.optionView[0] = this.temp.join('');
    this.options.current.value = this.optionView;
  }
}

export default App;
