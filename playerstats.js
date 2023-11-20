// Define the fetchData function for player statistics
async function fetchPlayerData() {
    const url = 'https://livescore-sports.p.rapidapi.com/v1/competitions/player-statistics?stat_type=main&competition_id=65&locale=EN';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '10e8b3ce4cmsha17d5dd26508decp16cb62jsn570245539a1d',
            'X-RapidAPI-Host': 'livescore-sports.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();

        const jsonData = JSON.parse(result);
        console.dir(jsonData);

        const tableBodyGoals = document.getElementById('playerTableBody');
        const tableBodyAssists = document.getElementById('playerTableAssist');

        // Check if DATA and STATISTICS properties exist for Goals
        if (jsonData.DATA && jsonData.DATA.STATISTICS && jsonData.DATA.STATISTICS[0] && jsonData.DATA.STATISTICS[0].PLAYERS_LIST) {
            const playersListGoals = jsonData.DATA.STATISTICS[0].PLAYERS_LIST;

            playersListGoals.forEach(player => {
                const row = tableBodyGoals.insertRow();
                row.innerHTML = `
                    <td>${player.PLAYER_RANK}</td>
                    <td>${player.PLAYER_NAME}</td>
                    <td><img src="${player.BADGE_SOURCE}" alt="Badge"> ${player.TEAM_NAME}</td>
                    <td>${Object.values(player.PLAYER_POINTS_LIST)[0]}</td>
                `;
            });
        } else {
            const errorRow = tableBodyGoals.insertRow();
            errorRow.innerHTML = '<td colspan="4" style="text-align: center; color: red;">Invalid JSON structure. Missing DATA, STATISTICS, or PLAYERS_LIST properties.</td>';
        }

        // Check if DATA and STATISTICS properties exist for Assists
        if (jsonData.DATA && jsonData.DATA.STATISTICS && jsonData.DATA.STATISTICS[1] && jsonData.DATA.STATISTICS[1].PLAYERS_LIST) {
            const playersListAssists = jsonData.DATA.STATISTICS[1].PLAYERS_LIST;

            playersListAssists.forEach(player => {
                const row = tableBodyAssists.insertRow();
                row.innerHTML = `
                    <td>${player.PLAYER_RANK}</td>
                    <td>${player.PLAYER_NAME}</td>
                    <td><img src="${player.BADGE_SOURCE}" alt="Badge"> ${player.TEAM_NAME}</td>
                    <td>${Object.values(player.PLAYER_POINTS_LIST)[0]}</td>
                `;
            });
        } else {
            const errorRow = tableBodyAssists.insertRow();
            errorRow.innerHTML = '<td colspan="4" style="text-align: center; color: red;">Invalid JSON structure. Missing DATA, STATISTICS, or PLAYERS_LIST properties.</td>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function when the document is ready
document.addEventListener('DOMContentLoaded', function () {
    fetchPlayerData();
});
