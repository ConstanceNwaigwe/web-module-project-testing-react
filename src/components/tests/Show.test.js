import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

const testShow = {
    //add in approprate test data structure here.
    name: "test show name",
    summary: "",
    seasons: [{
        id: 0,
        name: "",
        episodes: []
    }],

}

test('renders testShow and no selected Season without errors', ()=>{
    render(<Show show={testShow} selectedSeason={"none"} handleSelect={null}/>);
    const getName = screen.getByText(/test show name/i);
    expect(getName).toBeInTheDocument();
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} selectedSeason={"none"} handleSelect={null}/>);
    const load = screen.getByText(/Fetching data.../i);
    expect(load).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', ()=>{
    testShow.seasons = [{
        id: 1,
        name: "Five",
        episodes: [{
            id:2,
            name: "episode 1",
            image: null,
            season: 1,
            number: 1,
            summary: "episode 1 summary",
            runtime: 1
        }]},
        {
            id: 2,
            name: "four",
            episodes: [{
                id:3,
                name: "episode 1",
                image: null,
                season: 2,
                number: 1,
                summary: "episode 1 summary",
                runtime: 1
            }]
        }
    ]
    render(<Show show={testShow} selectedSeason={"none"} handleSelect={null}/>);
    const findseasons = screen.getAllByRole('option')
    expect(findseasons).toHaveLength(3);

});

test('handleSelect is called when an season is selected', () => {
    testShow.seasons = [{
        id: 1,
        name: "Five",
        episodes: [{
            id:2,
            name: "episode 1",
            image: null,
            season: 1,
            number: 1,
            summary: "episode 1 summary",
            runtime: 1
        }]},
        {
            id: 2,
            name: "four",
            episodes: [{
                id:3,
                name: "episode 1",
                image: null,
                season: 1,
                number: 1,
                summary: "episode 1 summary",
                runtime: 1
            }]
        }
    ]

    const handleSelect = (e) =>{
        e.preventdefault();
    }
    render(<Show show={testShow} selectedSeason={"none"} handleSelect={handleSelect}/>);
    const pickSeason = screen.getByText(/four/i);
    userEvent.click(pickSeason);
    //expect(handleSelect.mock).toHaveBeenCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
});

//Tasks:
//1. Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and (empty) list of episodes within them. Use console.logs within the client code if you need to to verify the structure of show data.
//2. Test that the Show component renders when your test data is passed in through show and "none" is passed in through selectedSeason.
//3. Test that the Loading component displays when null is passed into the show prop (look at the Loading component to see how to test for it's existance)
//4. Test that when your test data is passed through the show prop, the same number of season select options appears as there are seasons in your test data.
//5. Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select Dom element and userEvent reference materials to see how to trigger a selection.
//6. Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.