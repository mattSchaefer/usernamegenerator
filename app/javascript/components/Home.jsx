import React, {useEffect, useState, useRef} from "react";
import { Link } from "react-router-dom";
import WordScroller from './WordScroller'
export default () => {
  const [username, setUsername] = useState('')
  const [firstWord, setFirstWord] = useState('')
  const [secondWord, setSecondWord] = useState('')
  const [nouns, setNouns] = useState([])
  const [adjectives, setAdjectives] = useState([])
  const [usernames, setUsernames] = useState([])
  const [number, setNumber] = useState('')
  const [copiedTextTemp, setCopiedTextTemp] = useState('no')
  const stateRef = useRef()
  stateRef.nouns = nouns
  stateRef.adjectives = adjectives
  useEffect(() => {
    setInterval(() => {
      return function cleanup(){
        clearInterval()
      }
    },5000)
  })
  function generateUsername(){
    setUsername('')
    setFirstWord('')
    setSecondWord('')
    setNumber(null)
    document.getElementById('usernames-scrolling-list').classList.remove('hidden')
    document.getElementById('new-username-button').classList.add('hidden')
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    var options = {
      headers: headers,
      method: 'GET'
    }
    const gettingNouns = get_nouns()
    const gettingAdjectives = get_adjectives()
    console.log(gettingNouns)
    console.log(gettingAdjectives)
    Promise.all([gettingNouns, gettingAdjectives])
      .then((values) => {
          build_usernames()
      })
    var url = "/get_random_noun_and_adjective"
    fetch(url, options)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        if(json.status == 200){
          var ran_num = Math.round(Math.random() * 1000)
          setTimeout(() => {
            document.getElementById('usernames-scrolling-list').classList.add('hidden')
            document.getElementById('new-username-button').classList.remove('hidden')
            setUsername(json.adjective + json.noun + ran_num.toString())
            setFirstWord(json.adjective)
            setSecondWord(json.noun)
            setNumber(ran_num)
          },500)
        }
      })
  }
  function generateNoun(){
    get_nouns()
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    var options = {
      headers: headers,
      method: 'GET'
    }
    var url = "/get_random_noun"
    fetch(url, options)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        if(json.status == 200){
          setSecondWord(json.noun)
        }
      })
  }
  function generateAdjective(){
    get_adjectives()
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    var options = {
      headers: headers,
      method: 'GET'
    }
    var url = "/get_random_adjective"
    fetch(url, options)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        if(json.status == 200){
          setFirstWord(json.adjective)
        }
      })
  }
  function generateNumber(){
    var ran_num = Math.round(Math.random() * 1000)
    setNumber(ran_num)

  }
  async function get_nouns(){
    console.log('starting get_nouns')
    var url = '/get_list_of_nouns'
    var headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    var options = {
        method: "GET",
        headers: headers
    }
    await fetch(url,options)
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            console.log('finished get_nouns')
            setNouns(json.nouns)
        })
        .catch((e) => {})
}
async function get_adjectives(){
    console.log('starting get_adjectives')
    var url = '/get_list_of_adjectives'
    var headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    var options = {
        method: "GET",
        headers: headers
    }
    await fetch(url,options)
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        console.log('finished get_adjectives')
        setAdjectives(json.adjectives)
    })
    .catch((e) => {})
}
function build_usernames(){
    var usernames = []
    console.log("building usernames" + stateRef.adjectives)
    for(var i = 0; i < stateRef.adjectives.length; i++){
        var username = stateRef.adjectives[i].value+stateRef.nouns[i].value
        usernames.push(username)
        // setFirstWord(stateRef.adjectives[i].value)
        // setSecondWord(stateRef.nouns[i].value) 
        // setTimeout(() => {
        // },5)
    }
    setUsernames(usernames)
}
  function changeFirstWordFocus(){
    document.getElementById('first-word-span').classList.add('highlight')
  }
  function changeFirstWordBlur(){
    document.getElementById('first-word-span').classList.remove('highlight')
  }
  function changeSecondWordFocus(){
    document.getElementById('second-word-span').classList.add('highlight')
  }
  function changeSecondWordBlur(){
    document.getElementById('second-word-span').classList.remove('highlight')
  }
  function changeNumberFocus(){
    document.getElementById('number-span').classList.add('highlight')
  }
  function changeNumberBlur(){
    document.getElementById('number-span').classList.remove('highlight')
  }
  function copyButtonClick(){
    navigator.clipboard.writeText(firstWord + secondWord + number)
    document.getElementById('username-h1').classList.remove('italicized')
    setCopiedTextTemp('yes')
    setTimeout(() => {
      setCopiedTextTemp('no')
    },500)
  }
  function copyButtonFocus(){
    document.getElementById('username-h1').classList.add('italicized')
  }
  function copyButtonBlur(){
    document.getElementById('username-h1').classList.remove('italicized')
  }
  const usernames_map = usernames.map((w, index) => <li key={index} id={w+index} className="word-scroller-ele">{w}</li>)
  return(
    <div className="main-container">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Username Generator</h1>
          <p className="lead">
            Find your new alias.
          </p>
          <span className="home-body">
            <span className="home-body-inner">
              <span className="username-container-outer">
                <span className="username-container-left">
                  <h1 className="big-h1" id="username-h1">
                    <span id="first-word-span">{firstWord}</span>
                    <span id="second-word-span">{secondWord}</span>
                    <span id="number-span">{number}</span>
                    
                  </h1>
                  <span className="usernames-list-span">
                    <ul className="usernames-scrolling-list" id="usernames-scrolling-list">
                      {usernames_map}
                    </ul>
                  </span>
                </span>
                <span className="username-container-right">
                  {
                    username !== "" &&
                    <span className="button-span copy-button-span" id="copy-button-span">
                      <button onClick={copyButtonClick} onFocus={copyButtonFocus} onMouseEnter={copyButtonFocus} onBlur={copyButtonBlur} onMouseLeave={copyButtonBlur} id="copy-button">
                        {
                          copiedTextTemp == 'no' &&
                          <i className="fa fa-clipboard"></i>
                        }
                        {
                          copiedTextTemp == 'yes' &&
                          'copied!'
                        }
                      </button>
                    </span>
                  }
                  
                </span>
              </span>
              {
                username !== "" &&
                <span>
                  <span className="button-span">
                    <button onClick={generateAdjective} onFocus={changeFirstWordFocus} onMouseEnter={changeFirstWordFocus} onBlur={changeFirstWordBlur} onMouseLeave={changeFirstWordBlur}>change first word</button>
                  </span>
                  <span className="button-span">
                    <button onClick={generateNoun} onFocus={changeSecondWordFocus} onMouseEnter={changeSecondWordFocus} onBlur={changeSecondWordBlur} onMouseLeave={changeSecondWordBlur}>change second word</button>
                  </span>
                  <span className="button-span">
                    <button onClick={generateNumber}  onFocus={changeNumberFocus} onMouseEnter={changeNumberFocus} onBlur={changeNumberBlur} onMouseLeave={changeNumberBlur}>change number</button>
                  </span>
                </span>
              }
            </span>
            <hr className="my-4" />
          </span>
          <div className="flex-col">
              {/* <span>
                  <label>Include Border</label>
                  <input type="checkbox"></input>
              </span>
              <span>
                  <label>Include Numbers</label>
                  <input type="checkbox"></input>
              </span> */}
              <span className="button-span new-username-button-span">
                <button onClick={generateUsername} id="new-username-button">New Username</button>
              </span>
              <span className="socials-container">
              <div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="box_count" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div>
              <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false">Tweet</a>
              </span>
          </div>
        </div>
      </div>
    </div>
  )
};
