var fs = require('fs');

var leagues = ['al', 'nl'];

var loadPlayersFromLeague = function (league) {
    var mvpFilePath = 'data/mvp_' + league + '.json';
    fs.readFile(mvpFilePath, function (err, content) {
        var mvps = JSON.parse(content);
        console.log("We now have " + mvps.length + " MVPs");

        for (var i = 0; i < mvps.length; i++) {
            var mvp = mvps[i];
            mvps[i] = calculateOpsStat(mvp, league);
            mvps[i] = calculateWarStat(mvps[i], league);
            mvps[i] = calculateRarStat(mvps[i], league);
            mvps[i] = calculateWaaStat(mvps[i], league);
            mvps[i] = calculateRcStat(mvps[i], league);
        }

        //We write back the data
        fs.writeFileSync(mvpFilePath, JSON.stringify(mvps), 'utf-8');
    });
};

var calculateOpsStat = function (mvp, league) {
    var result = calculateStatForMvp(mvp, league, 'ops', 16, 'OPS', 200, 4);

    if (result != null) {
        mvp.ops = result.statValue;
        mvp.opsRank = result.rank;
    }

    return mvp;
};

var calculateWarStat = function (mvp, league) {

    var result = calculateStatForMvp(mvp, league, 'war', 15, 'WAR');

    if (result != null) {
        mvp.war = result.statValue;
        mvp.warRank = result.rank;
    }

    return mvp;
};

var calculateRarStat = function (mvp, league) {

    var result = calculateStatForMvp(mvp, league, 'rar', 14, 'RAR');

    if (result != null) {
        mvp.rar = result.statValue;
        mvp.rarRank = result.rank;
    }

    return mvp;
};

var calculateRcStat = function (mvp, league) {
    var result = calculateStatForMvp(mvp, league, 'rc', 6, 'RC');

    if (result != null) {
        mvp.rc = result.statValue;
        mvp.rcRank = result.rank;
    }

    return mvp;
};

var calculateWaaStat = function (mvp, league) {
    var result = calculateStatForMvp(mvp, league, 'waa', 12, 'WAA');

    if (result != null) {
        mvp.waa = result.statValue;
        mvp.waaRank = result.rank;
    }

    return mvp;
};

var calculateStatForMvp = function (mvp, league, folder, statIndex, statLabel, minAtBat, atBatIndex) {
    var year = mvp.year;
    if (mvp.position == "RHP" || mvp.position == "LHP") {
        console.log(year + " - Skipping " + mvp.name + ". He's a pitcher");
        return mvp;
    }
    var path = 'data/csv/' + league + '/' + folder + '/' + year + '.csv';
    if (fs.existsSync(path)) {
        var csvData = fs.readFileSync(path, 'utf-8');
        var rows = csvData.split(/\n/gi);
        //console.log(rows.length + " players in file");
        currentRank = 1;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            //console.log(row);
            var csv = row.split(/,/gi);

            if (parseInt(csv[0]) != 0) {
                var rank = currentRank;
                var name = csv[1];
                var playerStatValue = csv[statIndex];
                var atBat = csv[atBatIndex];

                if (name) {
                    name = name.replace('*', '').replace('#', '').replace(/\u00A0/g, ' ');
                    if (name.indexOf('\\') !== -1) {
                        name = name.split('\\')[0];
                    }
                    name = name.trim();
                }

                if (name == mvp.name) {
                    console.log(year + " - " + mvp.name + " is rank " + rank + " in " + statLabel + " (" + playerStatValue + ")");
                    return {
                        rank: rank,
                        statValue: playerStatValue
                    };
                }

                if (!minAtBat || atBat > minAtBat) {
                    currentRank++;
                }
            }
        }

        console.log(year + " - " + mvp.name + " is not in top 20 " + statLabel + ". He's a " + mvp.position);
    }

    return null;
};

loadPlayersFromLeague(leagues[0]);
