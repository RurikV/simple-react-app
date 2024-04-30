import axios from 'axios';
import { ChangeEvent, Component } from 'react';
import { DEFAULT_ERROR_MESSAGE, DEFAULT_RESPONSE_DATA, DEFAULT_URL, ERROR_MESSAGE } from '../constants';

interface FormFieldsProps { }

interface FormFieldsState {
  inputValue?: string,
  responseData?: string,
  errorMessage?: string,
}

export class FormFieldsClassComponent extends Component<FormFieldsProps, FormFieldsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      inputValue: DEFAULT_URL,
      responseData: DEFAULT_RESPONSE_DATA,
      errorMessage: DEFAULT_ERROR_MESSAGE,
    }
  }

  onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.currentTarget.value })
  }

  onClickReset = () => {
    this.setState({
      inputValue: DEFAULT_URL,
      responseData: DEFAULT_RESPONSE_DATA,
      errorMessage: DEFAULT_ERROR_MESSAGE,
    })
  }


  onClickSend = () => {
    const that = this;
    that.setState({ errorMessage: DEFAULT_ERROR_MESSAGE })
    axios({
      method: 'get',
      url: that.state.inputValue,
      responseType: 'stream'
    })
      .then((response) => {        
        that.setState({ responseData: response.data })
      })
      .catch((error) => {
        that.setState({
          responseData: DEFAULT_RESPONSE_DATA,
          errorMessage: ERROR_MESSAGE
        })

      });
  }

  render() {
    return <div>
      <h2>Class сomponent</h2>
      <div>
        <h4>Url</h4>
        <input value={this.state.inputValue} onChange={this.onChangeInput} />
        <button type="button" onClick={this.onClickSend}>Send</button>
        <button type="button" onClick={this.onClickReset}>Reset</button>
        {this.state.errorMessage && <div style={{ color: "red" }}>{this.state.errorMessage}</div>}
      </div>
      <div>
        <h4>Response</h4>
        <div style={{ border: "1px solid #555", padding: "10px", width: "400px", height: "200px", margin: "auto", wordBreak: "break-all", overflow: "auto" }}>
          {this.state.responseData}
        </div>
      </div>
    </div>
  }
}

