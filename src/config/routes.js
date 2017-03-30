import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, IndexRoute} from 'react-router-dom';
import Shows from '../shows';
import ViceHeaderLogo from '../../public/images/vice_header_logo.png';

// This example shows how to render two different screens
// (or the same screen in a different context) at the same url,
// depending on you got there.
//
// Click the colors and see them full screen, then "visit the
// gallery" and click on the colors. Note the URL and the component
// are the same as before but now we see them inside a modal
// on top of the old screen.


// const TopViceHeader = React.createClass({
//   render(){
//     return (
//             <div>
//               <img alt="topViceHeader" src={ViceHeaderLogo} />
//               <h1>Shows</h1>
//             </div>
//       )
//   }
// })

class TopViceHeader extends React.Component {
  render() {
    return (
            <div>
              <img alt="topViceHeader" src={ViceHeaderLogo} />
              <h1>Shows</h1>
            </div>
    );
  }
}

const Gallery = () => (
  <div>
    {Shows.map(i => (
      <Link key={i.id} to={{
          pathname: `/shows/${i.id}`,
          // this is the trick!
          state: { modal: true }
        }}>
        <h1>{i.title}</h1>
        <img alt={i.title} src={i.product_image_url} />
      </Link>
    ))}
  </div>
)

const ImageView = ({ match }) => {
  const show = Shows[parseInt(match.params.id, 10)]
  console.log(show);
  if (!show) {
    return <div>Image not found</div>
  }

  return (
    <div>
      <h1>{show.title}</h1>
      <img alt={show.title} src={show.product_image_url} />
    </div>
  )
}

const Modal = ({ match, history }) => {
  const show = Shows[parseInt(match.params.id, 10)]
  console.log(show);
  if (!show) {
    return null
  }
  const back = (e) => {
    e.stopPropagation()
    history.goBack()
  }
  return (
    <div
      onClick={back}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.15)'
      }}
    >
      <div className='modal' style={{
      position: 'absolute',
        background: '#fff',
        top: 25,
        left: '10%',
        right: '10%',
        padding: 15,
        border: '2px solid #444'
      }}>
        <ImageView />
        <button type='button' onClick={back}>
          Close
        </button>
      </div>
    </div>
  )
}

class ModalSwitch extends React.Component {

  // We can pass a location to <Switch/> that will tell it to
  // ignore the router's current location and use the location
  // prop instead.
  //
  // We can also use "location state" to tell the app the user
  // wants to go to `/images/2` in a modal, rather than as the
  // main page, keeping the gallery visible behind it.
  //
  // Normally, `/images/2` wouldn't match the gallery at `/`.
  // So, to get both screens to render, we can save the old
  // location and pass it to Switch, so it will think the location
  // is still `/` even though its `/images/2`.
  previousLocation = this.props.location

  componentWillUpdate(nextProps) {
    const { location } = this.props
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location
    }
  }

  render() {
    const { location } = this.props
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location // not initial render
    )
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route path='/' component={Gallery}/>
          <Route path='/shows' component={Gallery}/>
          <Route path='/shows/img/:id' component={ImageView}/>
        </Switch>
        {isModal ? <Route path='/shows/img/:id' component={Modal} /> : null}
      </div>
    )
  }
}

const ModalGallery = () => (
  <Router>
    <Route component={ModalSwitch} />
  </Router>
)

export default ModalGallery