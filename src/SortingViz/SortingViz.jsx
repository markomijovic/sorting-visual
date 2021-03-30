import React from 'react';
import {Navbar, Button} from 'react-bootstrap';
import './SortingViz.css';
import {mergeSort, quickSort, selectionSort, bubbleSort, insertionSort} from '../SortingAlgos/sortingAlgos.js'

export default class SortingViz extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            width: window.innerWidth,
            height: window.innerHeight
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    // runs when all page components are rendered
    componentDidMount() {
        this.updateWindowDimensions();
        this.generateArray();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }
 
    generateArray() {
        const arr = [];
        for (let i = 0; i < this.state.width/4.05; i++) {
            arr.push(randomIntFromInterval(10, this.state.height/1.15));
        }
        this.setState({
            array: arr
        });
    }

    mergeSort() {
        const animations = mergeSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'blue' : 'peru';
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                }, i * 5);
            } else {
                setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                }, i * 5);
            }
        }
    }

    quickSort() {
        const animations = quickSort(this.state.array, 0, this.state.array.length - 1);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'blue' : 'peru';
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                }, i * 5);
            } else {
                const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                barOneStyle.height = `${barTwoHeight}px`;
                barTwoStyle.height = `${barOneHeight}px`;
                }, i * 5);
            }
        }
    }

    selectionSort() {
        const animations = selectionSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const animation = animations[i];
            const animationLength = animation.length;
            for (let j = 0; j < animationLength; j++) {
                // if not last element, only change color
                const color = j % 2 === 0 ? 'blue' : 'peru';
                if (j + 1 !== animationLength) {
                    const [minIdx, compIdx] = animation[j];
                    const barMinStyle = arrayBars[minIdx].style;
                    const barCompStyle = arrayBars[compIdx].style;
                    setTimeout(() => {
                        barMinStyle.backgroundColor = color;
                        barCompStyle.backgroundColor = color;
                        }, i * 50);
                    
                } else {
                    const [minIdx, swapIdx, minHeight, swapHeight] = animation[j];
                    const barSwapStyle = arrayBars[swapIdx].style;
                    const barMinStyle = arrayBars[minIdx].style;
                    setTimeout(() => {
                        barSwapStyle.height = `${minHeight}px`;
                        barMinStyle.height = `${swapHeight}px`;
                    }, i * 50);
                }
            }
        }
    }

    insertionSort() {
        const animations = insertionSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const animation = animations[i];
            const animationLength = animation.length;
            for (let j = 0; j < animationLength; j++) {
                if (j !== animationLength - 1) {
                    const isColorChange = j % 3 !== 2;
                    if (isColorChange) {
                        const color = j % 3 === 0 ? 'blue' : 'peru';
                        const [barOneIdx, barTwoIdx] = animation[j];
                        const barOneStyle = arrayBars[barOneIdx].style;
                        const barTwoStyle = arrayBars[barTwoIdx].style;
                        setTimeout(() => {
                            barOneStyle.backgroundColor = color;
                            barTwoStyle.backgroundColor = color;
                        }, i * 50);
                    } else {
                        const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = animation[j];
                        const barOneStyle = arrayBars[barOneIdx].style;
                        const barTwoStyle = arrayBars[barTwoIdx].style;
                        setTimeout(() => {
                            barOneStyle.height = `${barTwoHeight}px`;
                            barTwoStyle.height = `${barOneHeight}px`;
                        }, i * 50);
                    }
                } else {
                    // there's better way to do this but this is quick and dirty 
                    const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = animation[j];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    setTimeout(() => {
                        barOneStyle.height = `${barTwoHeight}px`;
                        barTwoStyle.height = `${barOneHeight}px`;
                    }, i * 50);;
                }
            }
        }

    }

    bubbleSort() {
        const animations = bubbleSort(this.state.array);
        var counter = 0;
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const animation = animations[i];
            const animationLength = animation.length;
            for (let j = 0; j < animationLength; j++) {
                if (animation[j].length === 2) {
                    const color = counter % 2 === 0 ? 'blue' : 'peru';
                    counter += 1;
                    const [idxOne, idxTwo] = animation[j];
                    const barOneStyle = arrayBars[idxOne].style;
                    const barTwoStyle = arrayBars[idxTwo].style;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, i * 50);
                } else {
                    counter = 0;
                    const [idxHigher, idxLower, heightHigher, heightLower] = animation[j];
                    const barHigherStyle = arrayBars[idxHigher].style;
                    const barLowerStyle = arrayBars[idxLower].style;
                    setTimeout(() => {
                        barHigherStyle.height = `${heightLower}px`;
                        barLowerStyle.height = `${heightHigher}px`;
                    }, i * 50);
                }
            }
        }
    }

    // mandatory interface
    render() {
        const {array} = this.state;

        return (
            <>
            <Navbar bg="light" variant="light">
                <div class="btn-toolbar">
                    <Button variant="outline-primary" onClick={() => this.generateArray()}>Generate New Array</Button>&nbsp;
                    <Button variant="outline-secondary" onClick={() => this.selectionSort()}>Selection Sort</Button>&nbsp;
                    <Button variant="outline-secondary" onClick={() => this.bubbleSort()}>Bubble Sort</Button>&nbsp;
                    <Button variant="outline-secondary" onClick={() => this.insertionSort()}>Insertion Sort</Button>&nbsp;
                    <Button variant="outline-secondary" onClick={() => this.mergeSort()}>Merge Sort</Button>&nbsp;
                    <Button variant="outline-secondary" onClick={() => this.quickSort()}>Quick Sort</Button>&nbsp;
                </div>
            </Navbar>

            <div className="array-container">
                {array.map((value, index) => (
                    // defining html bar for each array element
                    <div 
                    className="array-bar" 
                    key={index} 
                    style={{height: `${value}px`}}>
                    </div>
                ) // end of map
                )}
            </div>
            </>
        );
    }
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 * From: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 */
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
