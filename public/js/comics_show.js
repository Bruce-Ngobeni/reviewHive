//==========================
//SELECT ELEMENTS
//==========================

const upvoteBtn = document.getElementById("upvote_btn");
const downvoteBtn = document.getElementById("downvote_btn");
const score = document.getElementById("score");


//==========================
//HELPER FUNCTION
//==========================

const sendVote = async (voteType) => {

    // Build fetch option
    const options = {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        }
    }

    if (voteType === "up") {

        options.body = JSON.stringify({ 
            voteType: "up",
            comicId
        })

    } else if (voteType == "down") {
        options.body = JSON.stringify({ 
            voteType: "down",
            comicId
        })
    } else {
        throw "voteType must be 'up' or 'down'"
    }

    //send fetch request
    await fetch("/comics/vote", options)
        .then(data => {
            return data.json();
        })
        .then(res => {
            console.log(res);
            handleVote(res.score, res.code)
        })
        .catch(err => {
            console.log(err);
        })

}


const handleVote = (newScore, code) => {
    //Update the score
    score.innerText = newScore;
}


//==========================
//ADD EVENT LISTENERS
//==========================

upvoteBtn.addEventListener("click", async () => {
    sendVote("up")
})

downvoteBtn.addEventListener("click", async () => {
    sendVote("down")
})