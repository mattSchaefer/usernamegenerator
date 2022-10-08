import React, {useState, useEffect, useRef} from 'react'
export default () => {
    const [nouns, setNouns] = useState([])
    const [adjectives, setAdjectives] = useState([])
    const [usernames, setUsernames] = useState([])
    const stateRef = useRef()
    stateRef.nouns = nouns
    stateRef.adjectives = adjectives
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
        }
        setUsernames(usernames)

    }
    useEffect(() => {
        const gettingNouns = get_nouns()
        const gettingAdjectives = get_adjectives()
        console.log(gettingNouns)
        console.log(gettingAdjectives)
        Promise.all([gettingNouns, gettingAdjectives])
            .then((values) => {
                build_usernames()
            })
            
    },[])
    //const nouns_map = nouns.map((w, index) => <span key={w.value + index} id={w.value} className="word-scroller-ele">{w.value}</span>)
    //const adjectives_map = adjectives.map((w, index) => <span  key={w.value + index} id={w.value} className="word-scroller-ele">{w.value}</span>)
    const usernames_map = usernames.map((w, index) => <li key={index} id={w+index} className="word-scroller-ele">{w}</li>)
    return(
        <div className="word-scroller-container-nouns">
            <ul>
                {usernames_map}
            </ul>
        </div>
    )
}