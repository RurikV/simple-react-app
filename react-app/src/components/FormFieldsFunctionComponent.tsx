import axios from 'axios';
import { ChangeEvent, FC, useRef, useState } from 'react';
import { DEFAULT_ERROR_MESSAGE, DEFAULT_RESPONSE_DATA, DEFAULT_URL, ERROR_MESSAGE } from '../constants';

export const FormFieldsFunctionComponent: FC = () => {
  const [inputValue, setInputValue] = useState(DEFAULT_URL);
  const [responseData, setResponseData] = useState(DEFAULT_RESPONSE_DATA);
  const [errorMessage, setErrorMessage] = useState(DEFAULT_ERROR_MESSAGE);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => setInputValue(event.currentTarget.value);

  const onClickReset = () => {
    setErrorMessage(DEFAULT_ERROR_MESSAGE)
    setResponseData(DEFAULT_RESPONSE_DATA);
    setInputValue(DEFAULT_URL);
  }

  const onClickSend = () => {
    if (!inputRef.current) return;

    setErrorMessage(DEFAULT_ERROR_MESSAGE);

    axios({
      method: 'get',
      url: inputRef.current.value,
      responseType: 'stream'
    })
      .then(function (response) {
        setResponseData(response.data)
      })
      .catch(function (error) {
        setResponseData(DEFAULT_RESPONSE_DATA);
        setErrorMessage(ERROR_MESSAGE)
      });
  }

  return (
    <div>
      <h2>Functional component</h2>
      <div>
        <h4>Url</h4>
        <input value={inputValue} ref={inputRef} onChange={onChangeInput} />
        <button type="button" onClick={onClickSend}>Send</button>
        <button type="button" onClick={onClickReset}>Reset</button>
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      </div>
      <div>
        <h4>Response</h4>
        <div style={{ border: "1px solid #555", padding: "10px", width: "400px", height: "200px", margin: "auto", wordBreak: "break-all", overflow: "auto" }}>
          {responseData}
        </div>
      </div>
    </div>
  );
}
