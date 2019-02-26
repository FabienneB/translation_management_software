import React from 'react';

function downloadTranslations() {
  return fetch('http://localhost:3001/v1/translations')
    .then(result => result.json());
}

// downloadTranslations().then(
//   response => {
//     console.log(response);
//     let translations = response;
//   }
// )
// .catch(console.error)



class IndexTranslations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      translations: [],
    };
  }

  render() {
    const { error, isLoaded, translations } = this.state;
    if (error) {
      // Don't forget to display information about the error
      return <div> Error : Download of translations failed  </div>;
    } else if (!isLoaded) {
      return <div> Loading... </div>;
    } else {
      return (
        <ul className="theList">
          {translations.map(translation => (
            <li key={translation.id}> {translation.key} {translation.language}: {translation.value}
            </li>
          ))}
        </ul>
      );
    }
  }
  componentDidMount(){
    downloadTranslations()
    .then(result => {
      this.setState({
        isLoaded: true,
        translations: result.translations
      });
    })
    .catch(console.error)
  }
}

export default IndexTranslations;
