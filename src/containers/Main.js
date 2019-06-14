import React from 'react'
import { connect } from 'react-redux'
import { open } from '../actions/openChannelEpic'
import { View, Text, Button } from 'react-native';
// Import the required shims
import 'ethers/dist/shims.js';

// Import the ethers library
import { ethers } from 'ethers';
import * as t from 'io-ts'
import {Validation} from "io-ts";


const {
    Contract,
    Wallet,
} = require('ethers');


const provider = ethers.getDefaultProvider('ropsten');


const privateKey = "C87509A1C067BBDE78BEB793E6FA76530B6382A4C0241E5E4A9EC0A0F44DC0D3"; // exported from MetaMask

const wallet = new Wallet(privateKey, provider);

// Ropsten deployed dummy contract

/*

contract Example {

    uint256 public _accum  = 0;

    function increment() public returns (uint256 sum) {
        _accum++;
    }

    function get() public view returns (uint256 valor) {
        return _accum;
    }
}
 */
*/
 */
const abi = [ { "constant": false, "inputs": [], "name": "increment", "outputs": [ { "name": "sum", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "_accum", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "get", "outputs": [ { "name": "valor", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ]
const contractAddress = "0xe2bC617C9245d318D460a3261FFD3Bbb93A9268A";
const contract = new Contract(contractAddress, abi, wallet);

class Main extends React.Component{

    constructor(props){
        super(props);
        this.state = {blockNumber: 0, sum: 0};
        // Just a test of io-ts
        const User = t.type({
            userId: t.number,
            name: t.string
        })
        let valid = User.decode(JSON.parse('{"userId":1,"name":"Giulio"}')) // => Right({ userId: 1, name: "Giulio" })
        let invalid = User.decode(JSON.parse('{"name":"Giulio"}')) // => Left([...])
        console.warn(JSON.stringify(valid));
        console.warn(JSON.stringify(invalid));


    }

    render = () =>{
        return  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF'}}>
        <Button title={"Test redux observable"} onPress={this.props.open}/>
            {this.props.loading && <Text> In progress ... </Text>}
            {!this.props.loading && <Text> Ready ... </Text>}
            <Button title={"Ropsten block number"} onPress={this.getBlockNumber}/>
            <Text> Ropsten block number: {this.state.blockNumber} </Text>
            <Button title={"Increment contract sum"} onPress={this.increment}/>
        </View>
    }

    getBlockNumber = () => {
        const _this = this;
        provider.getBlockNumber().then((blockNumber) => {
            _this.setState({blockNumber: blockNumber})
        });
    }

     increment = async () => {
         console.warn("Hitting SC");
        // Call the contract, getting back the transaction
        let tx = await contract.increment();
         console.warn("Waiting 2 confirmations");
        // Wait for the transaction to have 2 confirmations.
        // See the note below on "Economic Value" for considerations
        // regarding the number of suggested confirmations
        let receipt = await tx.wait(2);
        let value = await contract.get();
        console.warn("Transaction made. New value: "+value);
    }
}



export default connect(
    ({ loading, initial }) => ({ loading, initial}),
    { open }
)(Main)
