// the work of this file is to catch apis
class LiveScores {
    constructor(api_id) {
        this.api_key = api_id;
    }
    async getLiveData(){
        let promResponse = await fetch(`https://api.api-cricket.com/?method=get_livescore&APIkey=${this.api_key}`);
        return promResponse.json();
    }
};
class upcomingMatches{
    constructor(api_id) {
        this.api_key = api_id;
    }
    async getUpcomingMatch() {
        let current_date = new Date();
        let dd = current_date.getDate();
        let mm = current_date.getMonth() + 1; //As January is 0.
        let yyyy = current_date.getFullYear();
        let completeDate = `${yyyy}-${mm}-${dd -1}`;
        let next_date = `${yyyy}-${mm}-${dd+1}`;
        let response = await fetch(`https://api.api-cricket.com/cricket/?method=get_events&APIkey=${this.api_key}&date_start=${completeDate}&date_stop=${next_date}`);
        return response.json();
    }
}
class findPlayers{
    constructor(api_id){
        this.api_key = api_id;
    }
    async getPlayerByName(name){
        let player_id = await fetch(`https://cricapi.com/api/playerFinder?apikey=${this.api_key}&name=${name}`);
        return player_id.json()
    }
    async getPlayerStats(player_id){
        let player_stats = await fetch(`https://cricapi.com/api/playerStats?apikey=${this.api_key}&pid=${player_id}`);
        return player_stats.json();
    }
}