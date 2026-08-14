function InitialRenderTNGSlider(whichDataName, whichData, whichElement) {
    let tngSliderTemplate = document.getElementById('TNGSlider_template').innerHTML;
    let tngSliderUnitsTemplate = '<div id="TNGSlider_{{TNGSliderName}}_Unit_{{TNGSliderUnitId}}" class="TNGSlider_InnerBlock_Unit TNGSlider_InnerBlock_Unit_{{TNGSliderName}}"></div>';

    let thisSlider = tngSliderTemplate.replaceAll('{{TNGSliderName}}', whichData.name);
    thisSlider = thisSlider.replaceAll('TNGSliderDataName', whichDataName);
    thisSlider = thisSlider.replaceAll('{{TNGSliderDisplayName}}', whichData.displayName);

    let tngSliderUnits = "";
    for (let i = 0; i < whichData.max; i++) {
        let iPlusOne = i + 1;

        let temp = tngSliderUnitsTemplate.replaceAll('{{TNGSliderName}}', whichData.name);
        temp = temp.replaceAll('{{TNGSliderUnitId}}', iPlusOne);

        tngSliderUnits += temp;
    }

    thisSlider = thisSlider.replaceAll('{{TNGSliderUnits}}', tngSliderUnits);

    ////////////////////////////////////////////
    // generate styles for this specific slider
    let allCSS = '';

    // build width
    if (Object.hasOwn(whichData, 'width')) {
        allCSS += '#TNGSlider_' + whichData.name + ' {width: ' + whichData.width + '; max-width: calc(100vw - 110px); } ';
    }

    // build unitBorderColor
    if (Object.hasOwn(whichData, 'unitBorderColor')) {
        allCSS += '.TNGSlider_InnerBlock_Unit_' + whichData.name + ' {border-color: ' + whichData.unitBorderColor + '} ';
    }

    // build unitLitColor
    if (Object.hasOwn(whichData, 'unitLitColor')) {
        allCSS += '.TNGSlider_InnerBlock_Unit_' + whichData.name;
        allCSS += '.TNGSlider_InnerBlock_Unit_Lit {background-color: ' + whichData.unitLitColor + '} ';
    }

    // build plusColor
    if (Object.hasOwn(whichData, 'plusColor')) {
        allCSS += '#TNGSlider_' + whichData.name + '_Plus {background-color: ' + whichData.plusColor + '} ';
    }

    // build minusColor
    if (Object.hasOwn(whichData, 'minusColor')) {
        allCSS += '#TNGSlider_' + whichData.name + '_Minus {background-color: ' + whichData.minusColor + '} ';
    }

    // build unitAllBorderColor
    if (Object.hasOwn(whichData, 'unitBorderColor')) {
        allCSS += '#TNGSlider_' + whichData.name + '_InnerBlock {border-color: ' + whichData.unitAllBorderColor + '} ';
    }

    // build displayNameColor
    if (Object.hasOwn(whichData, 'displayNameColor')) {
        allCSS += '#TNGSlider_' + whichData.name + '_DisplayName {color: ' + whichData.displayNameColor + '} ';
    }

    // build valueColor
    if (Object.hasOwn(whichData, 'valueColor')) {
        allCSS += '#TNGSlider_' + whichData.name + '_Value {color: ' + whichData.valueColor + '} ';
    }

    // finish style element
    if (allCSS.length > 0) {
        allCSS = '<style>' + allCSS + '</style>';
    }

    thisSlider = thisSlider.replaceAll('{{TNGSliderStyles}}', allCSS);

    document.getElementById(whichElement).innerHTML = thisSlider;
}

function UpdateTNGSlider(whichSlider, buttonType) {
    if(buttonType === 'minus') {
        if (whichSlider.currentValue > whichSlider.min) {
            // play good beep 
                playSound('audioGoDown');
            // subtract one 
            whichSlider.currentValue = whichSlider.currentValue-1; 

            // update dom
            TNGSliderUpdateUnits(whichSlider);
        } else {
            playSound('audioDenied');
        }
    }

    if (buttonType === 'plus') {
        if (whichSlider.currentValue < whichSlider.max) {
            // play good beep
            playSound('audioGoUp');

            // subtract one 
            whichSlider.currentValue = whichSlider.currentValue + 1;

            // update dom
            TNGSliderUpdateUnits(whichSlider);
        } else {
            playSound('audioDenied');
        }
    }
};

function TNGSliderUpdateUnits(whichSlider) {
    document.getElementById('TNGSlider_' + whichSlider.name + '_Value').innerHTML = whichSlider.currentValue;
    let currentValue = whichSlider.currentValue; 

    // clear all lit
    for (let i = 0; i < whichSlider.max; i++) {
        let iPlusOne = i + 1;
        document.getElementById('TNGSlider_' + whichSlider.name + '_Unit_' + iPlusOne).classList.remove('TNGSlider_InnerBlock_Unit_Lit');
    }

    for (let i = 0; i < currentValue; i++) {
        let iPlusOne = i + 1;

        if (iPlusOne <= currentValue) {
            document.getElementById('TNGSlider_' + whichSlider.name + '_Unit_' + iPlusOne).classList.add('TNGSlider_InnerBlock_Unit_Lit');
        }
    }

    // store whichSlider to Local Storage
    // What should I call it?  How should I store and retrieve the data?
    //localStorage.setItem("userSession", JSON.stringify(whichSlider));
}

InitialRenderTNGSlider('warpDriveSlider', warpDriveSlider, 'TNGSliderWarpDrive');
    
InitialRenderTNGSlider('momentumSlider2', momentumSlider2, 'TNGSliderMomentum2');
