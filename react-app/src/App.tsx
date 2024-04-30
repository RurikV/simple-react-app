import './App.css';
import { FormFieldsClassComponent } from './components/FormFieldsClassComponent';
import { FormFieldsFunctionComponent } from './components/FormFieldsFunctionComponent';

function App() {
  return (
    <div className="App">
      <div className="flex gap-4 justify-center">
        <FormFieldsClassComponent />
        <FormFieldsFunctionComponent />
      </div>
    </div>
  );
}

export default App;
