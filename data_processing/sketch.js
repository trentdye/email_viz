var input;
var output = [];

function preload() {
    input = loadJSON('raw_data_jsonified.json');
}

function setup() {
    //console.log(input);
    for(var i=0; i<20670; i++){
        if(i % 159 == 0){
            inp = input[i];
            var listData = {};
            var monthData = [];
            listData.name = inp.Name;
            var startMonth = 0;
            var startMonthFound = false;
            for(var j=0; j<159; j++)
                {   
                    if(!startMonthFound && input[i+j].Value != 0) {
                        startMonth = j;
                        startMonthFound = true;
                    }
                    monthData[j]=input[i+j].Value;
                }
            listData.startMonth = startMonth;
            listData.data = monthData;
            output.push(listData);
        }
    }
    saveJSON(output,'clean_data.json',true); //the second argument determines whether to minify the data -- put it all on a single line
}


function draw() {
}