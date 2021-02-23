let j = 0;
class buildUI {
    constructor(api_id, api_id_2) {
        this.api_key = api_id;
        this.api_key_2 = api_id_2;

    }
    getLiveBox() {
        let liveData = new LiveScores(this.api_key);
        let height = 0;
        let i = 1;
        let retVal = liveData.getLiveData().then((response) => {
            let liveUI = "";
            if (response.result) {
                response.result.forEach(element => {
                    if (element.event_home_team) {
                        let add = `<div class="liveScore"><div class="tertiary-head">${element.event_home_team} vs ${element.event_away_team}</div><div class="team1Score">${element.event_home_final_result}</div><div class="team2Score">${element.event_away_final_result}</div><div class="caption">${element.event_status},${element.event_status_info}</div><div class="more" onclick="liveboxToggle(${i - 1})"><i class="fas fa-minus-square fa-2x"></i></div><div class="details"><div class="scorecard" onclick="display_scorecard(${i-1})">Scorecard</div><div class="MOM" onclick="get_MOM(${i-1})">Man Of Match</div><div class="summary" onclick="get_summary(${i-1})">Summary</div></div></div><div class="event_id">${element.event_key}</div>`;
                        liveUI += add;
                        if (i % 3 == 1) {
                            height += 350;
                        }
                        i++;
                    }
                });
            }
            j = i;
            return [liveUI, height];
        });
        return retVal;
    }
    getScorecard(event_id) {
        let liveData = new LiveScores(this.api_key);
        let retval = liveData.getLiveData().then((response) => {
            let score = "";
            response.result.forEach(element => {
                if (element.event_key == event_id) {
                    let home_team = element.event_home_team;
                    let away_team = element.event_away_team;
                    score += `<h2 class="secondary-head" style="background-color: #38617A;color: white;">${home_team} vs ${away_team}</h2><div class="otherDetails"><div id="subDetails1">League Name - ${element.league_name}</div> 
                    <div id="subDetails2">Match Start: ${element.event_date_start}</div> <div id="subDetails3">Match End: ${element.event_date_stop}</div> <div id="subDetails4">Match Time : ${element.event_time}</div> <div id="subDetails5">${home_team} - ${element.event_home_final_result}</div> <div id="subDetails6">${home_team} RR - ${element.event_home_rr}</div> <div id="subDetails7">${away_team} - ${element.event_away_final_result}</div> <div id="subDetails8">${away_team} RR - ${element.event_away_rr}</div> </div><div id="scorecard-head"><span>${home_team} Innings</span><span>${element.event_home_final_result}</span></div><table class="scorecard1"><tr><th>Batsman</th><th>status</th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr></table><div id="scorecard-head"><span>${away_team} Bowling</span><span></span></div><table class="scorecard12"><tr><th>Bowler</th><th>O</th><th>M</th><th>B</th><th>W</th><th>NB</th><th>ECO</th></tr></table><div id="scorecard-head"><span>${away_team} Innings</span><span>${element.event_away_final_result}</span></div><table class="scorecard123"><tr><th>Batsman</th><th>status</th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr></table><div id="scorecard-head"><span>${home_team} Bowling</span><span></span></div><table class="scorecard1234"><tr><th>Bowler</th><th>O</th><th>M</th><th>B</th><th>W</th><th>NB</th><th>ECO</th></tr></table><div class="startingLinups"><div class="home_team_linup"><div>${home_team}</div><p id="homeLinup"></p></div><div class="away_team_linup"><div>${away_team}</div><p id="awayLinup">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, fugit cupiditate! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio, deleniti.</p></div></div>`;
                }
            });
            let score1 = "";
            let score2 = "";
            let bowlingScore1 = "";
            let bowlingScore2 = "";
            response.result.forEach(element => {
                if (element.event_key == event_id){
                    let firstInn = element.scorecard[Object.keys(element.scorecard)[0]];
                let secondInn = element.scorecard[Object.keys(element.scorecard)[1]];
                if(firstInn){
                    firstInn.forEach(innings => {
                        if(innings.type == "Batsman") {
                            score1+= `<tr><td>${innings.player}</td><td>${innings.status}</td><td>${innings.R}</td><td>${innings.B}</td><td>${innings["4s"]}</td><td>${innings["6s"]}</td><td>${innings.SR}</td></tr>`
                            
                        }
                        else if(innings.type == "Bowler"){
                            bowlingScore1 += `<tr><td>${innings.player}</td><td>${innings.O}</td><td>${innings.M}</td><td>${innings.R}</td><td>${innings.W}</td><td>  -  </td><td>${innings.ER}</td></tr>`;
                        }
                    });
                }
                if(secondInn){
                    secondInn.forEach(innings => {
                        if (innings.type == "Batsman") {
                            score2 += `<tr><td>${innings.player}</td><td>${innings.status}</td><td>${innings.R}</td><td>${innings.B}</td><td>${innings["4s"]}</td><td>${innings["6s"]}</td><td>${innings.SR}</td></tr>`
                            
                        }
                        else if(innings.type == "Bowler"){
                            bowlingScore2 += `<tr><td>${innings.player}</td><td>${innings.O}</td><td>${innings.M}</td><td>${innings.R}</td><td>${innings.W}</td><td>  -  </td><td>${innings.ER}</td></tr>`;
                        }
                    });
                }   
                }
            });
            // second innings details
            // adding starting linups
            let homeLinup = "";
            response.result.forEach(element => {
                if(element.event_key == event_id){
                    if(element.lineups.home_team.starting_lineups){
                        element.lineups.home_team.starting_lineups.forEach(ele => {
                            homeLinup += `${ele.player},`;
                        });
                    }
                    else{
                        homeLinup += "No Data Available here";
                    }
                }
            });
            //away team linup
            let awayLinup = "";
            response.result.forEach(element => {
                if(element.event_key == event_id){
                    if(element.lineups.away_team.starting_lineups){
                        element.lineups.away_team.starting_lineups.forEach(ele => {
                            awayLinup += `${ele.player},`;
                        });
                    }
                    else{
                        awayLinup += "No Data Available here";
                    }
                }
            });
            return [score,score1,score2,bowlingScore1,bowlingScore2,homeLinup,awayLinup];
        });
        return retval;
    }
    buildUpcoming() {
        let upcomingData = new upcomingMatches(this.api_key);
        let i = 1;
        let height = 0;
        let retval = upcomingData.getUpcomingMatch().then((response) => {
            let upcomingUI = '';
            response.result.forEach(element => {
                if (element.event_home_team != null && element.event_status != null) {
                    upcomingUI += `<div class="liveScore"><div class="tertiary-head">${element.event_home_team} vs ${element.event_away_team}</div><div class="team1Score">${element.event_home_final_result}</div><div class="team2Score">${element.event_away_final_result}</div><div class="caption">${element.event_status},${element.event_status_info}</div><div class="more" onclick="liveboxToggle(${j - 1})"><i class="fas fa-minus-square fa-2x"></i></div><div class="details"><div class="scorecard" onclick="display_scorecard1(${j-1})">Scorecard</div><div class="MOM" onclick="get_MOM(${j-1})">Man Of Match</div><div class="summary" onclick="get_summary(${j-1})">Summary</div></div></div></div><div class="event_id">${element.event_key}</div>`;
                    if (i % 3 == 1) {
                        height += 350;
                    }
                    i++;
                    j++;
                }
            });
            return [upcomingUI, height];
        });
        return retval;
    }
    getUpcomingScore(event_id) {
        let liveData = new upcomingMatches(this.api_key);
        let retval = liveData.getUpcomingMatch().then((response) => {
            let score = "";
            response.result.forEach(element => {
                if (element.event_key == event_id) {
                    let home_team = element.event_home_team;
                    let away_team = element.event_away_team;
                    score += `<h2 class="secondary-head" style="background-color: #38617A;color: white;">${home_team} vs ${away_team}</h2><div class="otherDetails"><div id="subDetails1">League Name - ${element.league_name}</div> 
                    <div id="subDetails2">Match Start: ${element.event_date_start}</div> <div id="subDetails3">Match End: ${element.event_date_stop}</div> <div id="subDetails4">Match Time : ${element.event_time}</div> <div id="subDetails5">${home_team} - ${element.event_home_final_result}</div> <div id="subDetails6">${home_team} RR - ${element.event_home_rr}</div> <div id="subDetails7">${away_team} - ${element.event_away_final_result}</div> <div id="subDetails8">${away_team} RR - ${element.event_away_rr}</div> </div><div id="scorecard-head"><span>${home_team} Innings</span><span>${element.event_home_final_result}</span></div><table class="scorecard1"><tr><th>Batsman</th><th>status</th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr></table><div id="scorecard-head"><span>${away_team} Bowling</span><span></span></div><table class="scorecard12"><tr><th>Bowler</th><th>O</th><th>M</th><th>B</th><th>W</th><th>NB</th><th>ECO</th></tr></table><div id="scorecard-head"><span>${away_team} Innings</span><span>${element.event_away_final_result}</span></div><table class="scorecard123"><tr><th>Batsman</th><th>status</th><th>R</th><th>B</th><th>4s</th><th>6s</th><th>SR</th></tr></table><div id="scorecard-head"><span>${home_team} Bowling</span><span></span></div><table class="scorecard1234"><tr><th>Bowler</th><th>O</th><th>M</th><th>B</th><th>W</th><th>NB</th><th>ECO</th></tr></table><div class="startingLinups"><div class="home_team_linup"><div>${home_team}</div><p id="homeLinup"></p></div><div class="away_team_linup"><div>${away_team}</div><p id="awayLinup">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, fugit cupiditate! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio, deleniti.</p></div></div>`;
                }
            });
            let score1 = "";
            let score2 = "";
            let bowlingScore1 = "";
            let bowlingScore2 = "";
            response.result.forEach(element => {
                if (element.event_key == event_id){
                    let firstInn = element.scorecard[Object.keys(element.scorecard)[0]];
                let secondInn = element.scorecard[Object.keys(element.scorecard)[1]];
                if(firstInn){
                    firstInn.forEach(innings => {
                        if(innings.type == "Batsman") {
                            score1+= `<tr><td>${innings.player}</td><td>${innings.status}</td><td>${innings.R}</td><td>${innings.B}</td><td>${innings["4s"]}</td><td>${innings["6s"]}</td><td>${innings.SR}</td></tr>`
                            
                        }
                        else if(innings.type == "Bowler"){
                            bowlingScore1 += `<tr><td>${innings.player}</td><td>${innings.O}</td><td>${innings.M}</td><td>${innings.R}</td><td>${innings.W}</td><td>  -  </td><td>${innings.ER}</td></tr>`;
                        }
                    });
                }
                if(secondInn){
                    secondInn.forEach(innings => {
                        if (innings.type == "Batsman") {
                            score2 += `<tr><td>${innings.player}</td><td>${innings.status}</td><td>${innings.R}</td><td>${innings.B}</td><td>${innings["4s"]}</td><td>${innings["6s"]}</td><td>${innings.SR}</td></tr>`
                            
                        }
                        else if(innings.type == "Bowler"){
                            bowlingScore2 += `<tr><td>${innings.player}</td><td>${innings.O}</td><td>${innings.M}</td><td>${innings.R}</td><td>${innings.W}</td><td>  -  </td><td>${innings.ER}</td></tr>`;
                        }
                    });
                }   
                }
            });
            // second innings details
            // adding starting linups
            let homeLinup = "";
            response.result.forEach(element => {
                if(element.event_key == event_id){
                    if(element.lineups.home_team.starting_lineups){
                        element.lineups.home_team.starting_lineups.forEach(ele => {
                            homeLinup += `${ele.player},`;
                        });
                    }
                    else{
                        homeLinup += "No Data Available here";
                    }
                }
            });
            //away team linup
            let awayLinup = "";
            response.result.forEach(element => {
                if(element.event_key == event_id){
                    if(element.lineups.away_team.starting_lineups){
                        element.lineups.away_team.starting_lineups.forEach(ele => {
                            awayLinup += `${ele.player},`;
                        });
                    }
                    else{
                        awayLinup += "No Data Available here";
                    }
                }
            });
            return [score,score1,score2,bowlingScore1,bowlingScore2,homeLinup,awayLinup];
        });
        return retval;
    }
    buildPlayerUI() {
        let player_credentials = new findPlayers(this.api_key_2);
        let height = 0;
        let i = 1;
        let name = document.getElementById("player_stats").value;
        // add player ids to the array
        let player_ids = player_credentials.getPlayerByName(name).then((response) => {
            let player_ids = [];
            response.data.forEach(element => {
                player_ids.push(element.pid);
            });
            return player_ids;
        }).catch((err) => {
            alert(err);
        });
        let retval = player_ids.then((response) => {
            let full_details = [];
            let matched_player = [];
            response.forEach(element => {

                let returnData = player_credentials.getPlayerStats(element).then((res) => {
                    return `<div class="player_info_display"><h6 class="tertiary-head" id="player_head" style="text-align: center;">${res.fullName}</h6><img src="https://www.cricapi.com/playerpic/${element}.jpg" alt="sachin"><h5 class="country">COUNTRY  :  ${res.country} </h5><h5 class="country">BATTING  :  ${res.battingStyle} </h5><div id="button-box"><button onclick="display_stats(${element})" class="info">More</button></div></div>`;
                });
                let full_stats = player_credentials.getPlayerStats(element).then((res)=>{
                    return res;
                })
                full_details.push(full_stats);
                matched_player.push(returnData);
                if (i % 3 == 1) {
                    height += 350;
                }
                i++;
            });
            return [matched_player, height,full_details];
        });
        console.log(retval);
        return retval;
    }
}