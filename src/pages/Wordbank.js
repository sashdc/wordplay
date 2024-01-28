import React from 'react'
import { Link } from 'react-router-dom'

const Wordbank = () => {
  return (
    <div className="main-container">
       <section>
          <div className="m-3 row justify-content-between align-items-center">
            <h2>wordbank: </h2>
            <Link to="/">
            <button id="home-button" className="standard-button" type="button">home</button>
            </Link>
          </div>
          <div className="my-section">
            <div id="word-bank" className="mt-5 d-flex w-100 flex-wrap justify-content-around">
              {/* <!-- Wordbank word buttons appended here --> */}
              {/* <!-- modal to show details --> */}
            </div>
            <div id="statusbar" className="row w-75 m-2 pb-3">
                <h4 id="win-rate">win stats:</h4>
                {/* <!-- Bulma stats bar --> */}
                  <progress id="statusbar-win" className="progress is-link" value="0" max="100">wins</progress>
            </div>
          </div>
        </section>

    {/* // <!-- Modal --> */}
    <div className="modal fade word-wrap" id="wordModal" tabindex="-1" role="dialog" aria-labelledby="selected word details" aria-hidden="true">
        <div className="modal-dialog flex-wrap" role="document">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h5 className="modal-title font-weight-bold" id="modal-title">
                {/* <!-- Push Word Here--> */}
                </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {/* <!-- Push word content here --> */}
            <div className="modal-body text-break">
              <p id="part-speech" ></p>
              <p id="word-definition" className="font-italic"></p>
              <p id="word-synonym" className="text-break font-italic"></p>
              <p><a id="dict-link" href="" target="_blank">See the dictionary entry</a></p>
              <button type="button" className="btn btn-secondary" id="delete-word">Delete Word</button>
            </div>
        </div>
      </div>
    </div>
    </div>

  )
}

export default Wordbank