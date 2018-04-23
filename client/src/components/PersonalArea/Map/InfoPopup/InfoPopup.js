import React, {Component} from 'react';


class InfoPopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'Some Title',
            subscription: 'Some Subscription',
            imageUrls: []
        }
    }

    onChangeTitle(title) {
        this.setState({title})
    };

    onChangeSubscription(subscription) {
        this.setState({subscription});
    };

    onChangeFile(files, index) {
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();

            reader.onload = () => {
                let markers = [...this.state.markers];
                const dataUrl = reader.result;
                markers[index].info.imageUrls.push(dataUrl);
                this.setState({markers});
            };

            reader.readAsDataURL(files[i]);
        }
    }

    handleSubmit(event){
        console.log(event);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input onChange={e => {this.onChangeTitle(e.target.value)}} value={this.state.title} type="text" placeholder="Title"/>
                    <textarea name="subscription" onChange={e => {this.onChangeSubscription(e.target.value)}} value={this.state.subscription} placeholder="Subscription"/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default InfoPopup;