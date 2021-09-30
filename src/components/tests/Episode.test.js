import React from 'react';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const testEpisode = {
    id:1,
    name: "",
    image: "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
    season: 1,
    number: 1,
    summary: "",
    runtime: 1
}

const testEpisodeWithoutImage = {
    //Add in approprate test data structure here.
    id:2,
    name: "altimage",
    image: null,
    season: 1,
    number: 1,
    summary: "altsummary",
    runtime: 1
}

test("renders without error", () => {
    render(<Episode episode={testEpisode}/>);
    const getRuntime = screen.getByText(/1 minutes/i);
    expect(getRuntime).toBeInTheDocument();

});

test("renders the summury test passed as prop", ()=>{
    const testSummary = "This is a test summary.";
    render(<Episode episode={testEpisode}/>);

    //const sum = screen.getByText(/This is a test summary./i);
    expect(testEpisode.summary).toHaveLength(0);

    testEpisode.summary = testSummary;
    render(<Episode episode={testEpisode}/>);
    const sum = screen.getByText(/This is a test summary./i);
    expect(sum).toBeInTheDocument();
    expect(testEpisode.summary).toHaveLength(testSummary.length);
});

test("renders default image when image is not defined", ()=>{
    render(<Episode episode={testEpisodeWithoutImage}/>);
    const getName = screen.getByText(/altimage/i);
    const getAlt = screen.getByAltText('./stranger_things.png');
    expect(getName).toBeInTheDocument();
    expect(getAlt).toBeInTheDocument();

})

//Tasks
//1. Complete a test that shows the Episode component renders. Pass in the provided example episode data as a test prop.
//2. Modify the test data to display a specific summary statement. Complete a test that shows that the summary value passed in to the Episode component displays as expected. Use no more then 3 different expect statements to test the the existance of the summary value.
//3. The episode component displays a default value ('./stranger_things.png') when a image url is not provided. Create a new piece of test data with the image property set to null. Test that the alt tag of the image displayed is set to './stranger_things.png'.