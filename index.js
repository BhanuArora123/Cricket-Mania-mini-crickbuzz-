// fetching live details of matches
let getUI = new buildUI("your api","your api");
let liveData = getUI.getLiveBox();
liveData.then((response) => {
    let liveMatches = document.getElementById("liveMatches");
    console.log(response);
    if (response[0] != '') {
        liveMatches.innerHTML = response[0];
        liveMatches.setAttribute("style", `height:${response[1]}px;`);
    }
    else {
        liveMatches.innerHTML = '<h2 class="redAlert" style="color: red;width: 100%;display: flex;justify-content: center;">Sorry but no live matches are there , you will get updates if there is any match live</h2>';
        liveMatches.style.height = "90px";
    }
});
// getting upcoming fixtures
let upcomingFixtures = document.getElementById("upcomingMatches");
getUI.buildUpcoming().then((response) => {
    console.log(response);
    upcomingFixtures.innerHTML = response[0];
    console.log(response[0]);
    upcomingFixtures.setAttribute("style", `height:${response[1]}px;`);
});
// fetching stats of different cricketers
let player_info = document.getElementsByClassName("fa-search")[0];
player_info.addEventListener("click", () => {
    getUI.buildPlayerUI().then((response) => {
        let playerStats = document.getElementById("playerStats");
        playerStats.innerHTML = '';
        playerStats.style.height = 0;
        response[0].forEach(element => {
            element.then((res) => {
                playerStats.innerHTML += res;
            })
        });
        playerStats.style.height = `${response[1]}px`;
    });
});
// toggling action
let istoggled = false;
function toggle() {
    let hambarNav = document.getElementById("hambarNav");
    if (!istoggled) {
        hambarNav.style.display = "flex";
        istoggled = true;
    }
    else {
        hambarNav.style.display = "none";
        istoggled = false;
    }
}
// slider movement
let sliderPosition = 0;
function moveLeft() {
    let movingBox = document.getElementsByClassName("movingBox")[0];
    if (sliderPosition != 0) {
        sliderPosition += 100;
        movingBox.style.left = `${sliderPosition}%`;
    }
}
function moveRight() {
    let movingBox = document.getElementsByClassName("movingBox")[0];
    if (sliderPosition != -100) {
        sliderPosition -= 100;
        movingBox.style.left = `${sliderPosition}%`;
    }
}
// live score box menu movement by - icon
let toggled = new Array(12).fill(false);
function liveboxToggle(num) {
    let liveboxMenu = document.getElementsByClassName("details")[num];
    let minusIcon = document.getElementsByClassName("fa-minus-square")[num];
    if (!toggled[num]) {
        minusIcon.style.color = "white";
        liveboxMenu.style.display = "flex";
        liveboxMenu.style.animation = "toggleIn 1s 1";
        toggled[num] = true;
    }
    else {
        minusIcon.style.color = "black";
        liveboxMenu.style.animation = "toggleOut 1s";
        setTimeout(() => {
            liveboxMenu.style.display = "none";
        }, 700);
        toggled[num] = false;
    }
}
function display_scorecard(num) {
    let event_id = document.getElementsByClassName("event_id")[num];
    let getUI = new buildUI("your api","your api");
    console.log(event_id.innerHTML);
    getUI.getScorecard(event_id.innerHTML).then((response) => {
        console.log(response);
        let displayData = document.getElementById("chuttiya");
        displayData.innerHTML = response[0];
        // add records in data display
        let scorecard = document.getElementsByClassName("scorecard1")[0];
        let scorecard1 = document.getElementsByClassName("scorecard12")[0];
        let scorecardBowling = document.getElementsByClassName("scorecard123")[0];
        let scorecardBowling1 = document.getElementsByClassName("scorecard1234")[0];
        // let a = scorecard.innerHTML;
        // let b = scorecard1.innerHTML;
        // let c = scorecardBowling.innerHTML;
        // let d = scorecardBowling1.innerHTML;
        let homeLinups = document.getElementsByClassName("home_team_linup")[0].getElementsByTagName("p")[0];
        let awayLinups = document.getElementsByClassName("away_team_linup")[0].getElementsByTagName("p")[0];
        scorecard.innerHTML += response[1];
        scorecard1.innerHTML += response[2];
        scorecardBowling.innerHTML += response[3];
        scorecardBowling1.innerHTML += response[4];
        homeLinups.innerHTML = response[5];
        awayLinups.innerHTML = response[6];
        window.location.href = "#chuttiya";
    });
}
setInterval(()=>{
    location.reload();
},120000);
function display_scorecard1(num) {
    let event_id = document.getElementsByClassName("event_id")[num];
    let getUI = new buildUI("your api" ,"your api");
    console.log(event_id.innerHTML);
    getUI.getUpcomingScore(event_id.innerHTML).then((response) => {
        console.log(response);
        let displayData = document.getElementById("chuttiya");
        displayData.innerHTML = response[0];
        // add records in data display
        let scorecard = document.getElementsByClassName("scorecard1")[0];
        let scorecard1 = document.getElementsByClassName("scorecard123")[0];
        let scorecardBowling = document.getElementsByClassName("scorecard12")[0];
        let scorecardBowling1 = document.getElementsByClassName("scorecard1234")[0];
        // let a = scorecard.innerHTML;
        // let b = scorecard1.innerHTML;
        // let c = scorecardBowling.innerHTML;
        // let d = scorecardBowling1.innerHTML;
        let homeLinups = document.getElementsByClassName("home_team_linup")[0].getElementsByTagName("p")[0];
        let awayLinups = document.getElementsByClassName("away_team_linup")[0].getElementsByTagName("p")[0];
        scorecard.innerHTML += response[1];
        scorecard1.innerHTML += response[2];
        scorecardBowling.innerHTML += response[3];
        scorecardBowling1.innerHTML += response[4];
        homeLinups.innerHTML = response[5];
        awayLinups.innerHTML = response[6];
        window.location.href = "#chuttiya";
    });
}
// function to display player stats
function display_stats(player_id) {
    getUI.buildPlayerUI().then((response) => {
        response[2].forEach(element => {
            element.then((res) => {
                if (res.pid == player_id) {
                    let displayData = document.getElementById("chuttiya");
                    displayData.innerHTML = `<div class="all_stats"><h2 class="secondary-head" id="player_name">${res.fullName}
                    </h2><div id="div1"><img src="${res.imageURL}" alt="sachin" ></div><div id="div2">battingStyle: "${res.battingStyle}",</div><div id="div3">bowlingStyle: "${res.bowlingStyle}",</div><div id="div4">currentAge: "${res.currentAge}",</div><div id="div5">born: "${res.born}",</div><div id="div6">fullName: "${res.fullName}",</div>
                    <div id="div7">name: "${res.name}",</div><div id="div8">country: "${res.country}",</div><div id="div9">playingRole: "${res.playingRole}",</div><div id="div10">majorTeams: "${res.majorTeams}",</div><p>${res.profile}</p></div><table id="matchDetails"><tr><th id="params">parameters</th><th class="bowling">bowling</th><th class="batting">batting</th></tr><tr><td><table id="paramTable"><tr><th>Parameters</th></tr><tr><td>10</td></tr><tr><td>4w</td></tr><tr><td>5w</td></tr><tr><td>sr</td></tr><tr><td>econ</td></tr><tr><td>ave</td></tr><tr><td>BBM</td></tr><tr><td>BBI</td></tr><tr><td>Wkts</td></tr><tr><td>Runs</td></tr><tr><td>Balls</td></tr><tr><td>Inns</td></tr><tr><td>Mats</td></tr></table></td><td class="subTable"><table id="bowlingTable"><tr><th>list A</th><th>ODI</th><th>t20</th><th>test</th></tr></table></td><td class="subTable"><table id="battingTable"><tr><th>list A</th><th>ODI</th><th>t20</th><th>test</th></tr></table></td></tr></table>`;
                    let bowlingStats = document.getElementById("bowlingTable");
                    let battingStats = document.getElementById("battingTable");
                    batting = "";
                    bowling = "";
                    for (let i = 0; i < 13; i++) {
                        bowling += `<tr>
                        <td>${res.data.bowling.listA[Object.keys(res.data.bowling.listA)[i]]}</td>
                        <td>${res.data.bowling.ODIs[Object.keys(res.data.bowling.ODIs)[i]]}</td>
                        <td>${res.data.bowling.T20Is[Object.keys(res.data.bowling.T20Is)[i]]}</td>
                        <td>${res.data.bowling.tests[Object.keys(res.data.bowling.tests)[i]]}</td>
                    </tr>`;
                        batting += `<tr>
                        <td>${res.data.batting.listA[Object.keys(res.data.batting.listA)[i]]}</td>
                        <td>${res.data.batting.ODIs[Object.keys(res.data.batting.ODIs)[i]]}</td>
                        <td>${res.data.batting.T20Is[Object.keys(res.data.batting.T20Is)[i]]}</td>
                        <td>${res.data.batting.tests[Object.keys(res.data.batting.tests)[i]]}</td>
                    </tr>`
                    }
                    bowlingStats.innerHTML += bowling;
                    battingStats.innerHTML += batting;
                }
            })
        });
    })
    window.location.href = "#chuttiya";
}
