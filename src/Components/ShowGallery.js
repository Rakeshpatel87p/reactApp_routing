import React from 'react';
import ReactDOM from 'react-dom';
import Shows from './shows';

const ShowTitle = React.createClass({
	render(){
		return <h1>{this.props.showTitle}</h1>
	}
});

const EpisodeNumbers = React.createClass({
	render(){
		return <h1>{this.props.episodeNumbers}</h1>
	}
});

const ShowImage = React.createClass({
	render(){
		return (
				<img src={this.props.showImage} />
		)
	}
});

const ShowCard = React.createClass({
    render() {
        let showComponents = ShowInformation.map(show => {
        	       return (
        	       		
	            		<div className={show.title} key={show.id}>
							<ShowTitle showTitle = {show.title}/>
							<ShowImage showImage={show.product_image_url} showID={show.id}/>
							<EpisodeNumbers episodeNumbers= {show.episodes}/>
						</div>
						
					

            	);
        })
        return <div>{showComponents}</div>;
    }
});

ReactDOM.render(<ShowCard />, document.getElementById('app'))

export default ShowCard;
export {ShowTitle, EpisodeNumbers, ShowImage};