import React, { Component } from 'react';

const endpoint = 'https://api.chucknorris.io/jokes/random?category=dev';

const getSentence = (url) => fetch(url).then((response) => response.json());

class App extends Component {
    state = {
        showLandingPage: true,
        sentence1: '',
        sentence2: '',
        winner: '',
    };

    showFacts = () => {
        this.setState({
            showLandingPage: false,
        });
    };

    storeSentences = () => {
        Promise.all([getSentence(endpoint), getSentence(endpoint)]).then(
            (data) =>
                this.setState({
                    sentence1: data[0].value,
                    sentence2: data[1].value,
                    winner: '',
                })
        );
    };

    chooseSentence = (sentence) => {
        this.setState({
            winner: this.state[sentence],
        });
    };

    componentDidMount() {
        // fetch(url)
        //     .then((response) => response.json())
        //     .then((data) =>
        //         this.setState({
        //             sentence1: data.value,
        //         })
        //     );
        // fetch(url)
        //     .then((response) => response.json())
        //     .then((data) =>
        //         this.setState({
        //             sentence2: data.value,
        //         })
        //     );
        this.storeSentences();
    }

    render() {
        return (
            <>
                {this.state.showLandingPage ? (
                    <section>
                        <h1>Chuck Facts</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Morbi eu elit ligula. Ut sit amet ornare urna,
                            vitae vehicula tortor. Suspendisse bibendum varius
                            neque quis mattis. Duis ut sagittis elit. Vivamus
                            feugiat eros eros, in iaculis nisl molestie sed.
                            Curabitur porta molestie quam, luctus eleifend arcu
                            tincidunt id. Nam feugiat augue viverra ultricies
                            dapibus. Proin eleifend facilisis magna quis
                            consequat.{' '}
                        </p>
                        <button onClick={this.showFacts}>
                            Give me those facts
                        </button>
                    </section>
                ) : (
                    <>
                        <p>
                            {this.state.sentence1}
                            <button
                                onClick={() => this.chooseSentence('sentence1')}
                            >
                                Choose it
                            </button>
                        </p>
                        <p>
                            {this.state.sentence2}
                            <button
                                onClick={() => this.chooseSentence('sentence2')}
                            >
                                Choose it
                            </button>
                        </p>
                        {this.state.winner && (
                            <>
                                <h2>The funniest joke: {this.state.winner}</h2>
                                <button onClick={this.storeSentences}>
                                    Give me more
                                </button>
                            </>
                        )}
                    </>
                )}
            </>
        );
    }
}

export default App;
