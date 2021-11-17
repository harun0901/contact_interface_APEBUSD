import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useMemo, useState } from 'react';
import { Accordion, Row, Col, Form, Button } from 'react-bootstrap';
import BscDapp from '@obsidians/bsc-dapp';
import {contractAddress} from '../Contract';
import abi from '../Contract/abi.json';

function Home() {

  const dapp = useMemo(() => new BscDapp(), []);
  window.dapp = dapp;

  const [enabled, setEnabled] = useState(dapp.isBrowserExtensionEnabled);
  const [account, setAccount] = useState(dapp.currentAddress);
  const [network, setNetwork] = useState();

  const [contractInfo, setContractInfo] = useState({
    address: '0xbfC506855279a3cEa9955AB459e8C72961aDf438',
  })

  /****  here contract function params state  ***/
  const [setBuyFeeParams, setSetBuyFeeParams] = useState({_liquidityBuyFee: '', _marketingBuyFee: '', _charityBuyFee: '', _reflectionBuyFee: ''});
  const [setDistributionCriteriaParams, setSetDistributionCriteriaParams] = useState({_minPeriod: '', _minDistribution: ''});
  const [setDistributorSettingsParams, setSetDistributorSettingsParams] = useState({gas: ''});
  const [setFeeReceiversParams, setSetFeeReceiversParams] = useState({_liquidityFeeReceiver: '', _marketingFeeReceiver: '', _charityFeeReceiver: ''});
  const [setIsFeeExemptParams, setSetIsFeeExemptParams] = useState({holder: '', exempt: ''});
  const [setIsTxLimitExemptParams, setSetIsTxLimitExemptParams] = useState({holder: '', exempt: ''});
  const [setpenaltyFeeParams, setSetpenaltyFeeParams] = useState({_marketingPenaltyFee: '', _charityPenaltyFee: '', _reflectionPeanltyFee: ''});
  const [setPenaltyFeeFreeTimeParams, setSetPenaltyFeeFreeTimeParams] = useState({_penaltyFreeTime_normal: '', _penaltyFreeTime_presale: '', _penaltyFreeTime_privatesale: ''});
  const [setPresaleListParams, setSetPresaleListParams] = useState({useraddrss: ''});
  const [setPrivateListParams, setSetPrivateListParams] = useState({useraddrss: ''});
  const [setSellFeeParams, setSetSellFeeParams] = useState({_liquiditySellFee: '', _marketingSellFee: '', _charitySellFee: '', _reflectionSellFee: ''});
  const [setSwapBackSettingsParams, setSetSwapBackSettingsParams] = useState({_enabled: '', _amount: ''});
  const [setTxLimitParams, setSetTxLimitParams] = useState({amount: ''});
  const [transferOwnershipParams, setTransferOwnershipParams] = useState({address: ''});
  
  /*****/
  
  useEffect(() => dapp.onEnabled(account => {
    setEnabled(true);
    setAccount(account);
    updateNetwork(dapp.network);
  }))

  const updateNetwork = (network = {}) => {
    if (network.isBscMainnet) {
      setNetwork('Mainnet');
    } else if (network.isBscTestnet) {
      setNetwork('Testnet');
    } else {
      setNetwork();
    }
  }

  let browserExtensionStatus;
  let enableButton = null;
  if (dapp.isBrowserExtensionInstalled) {
    browserExtensionStatus = `${dapp.browserExtension.name} Detected. ${enabled ? 'Enabled.' : 'Not enabled'}`;
    if (!enabled) {
      
      enableButton = (
        <Button onClick={() => dapp.enableBrowserExtension()}>
          Enable {dapp.browserExtension.name}
        </Button>
      )
    }
  } else {
    browserExtensionStatus = 'No Browser Extension detected'
  }

  let accountInfo = null
  if (enabled && account) {
    accountInfo = (
      <div>
        Current account: <small><code>{account.address}</code></small>
      </div>
    )
  }

  const execute = async (name, params = []) => {
    const { address } = contractInfo;
    const txParams = await dapp.executeContract({ address, abi }, name, params);
    const txHash = await dapp.sendTransaction({
      from: account.address,
      value: dapp.parseEther('0'),
      ...txParams,
    });

    console.log(txHash);
  }

  const checkEnabled = () => {
    if (enabled) {
      return true;
    } else {
      alert('please connect wallet first');
      return false;
    }
  }

  const setBuyFee = async () => {
    if (checkEnabled()) {
      let params = Object.values(setBuyFeeParams);
      console.log(params);
      await execute('setBuyFee', params);
    }
  }

  const setDistributionCriteria = async () => {
    if (checkEnabled()) {
      let params = Object.values(setDistributionCriteriaParams);
      console.log(params);
      await execute('setDistributionCriteria', params);
    }
  }

  const setDistributorSettings = async () => {
    if (checkEnabled()) {
      let params = Object.values(setDistributorSettingsParams);
      console.log(params);
      await execute('setDistributorSettings', params);
    }
  }

  const setFeeReceivers = async () => {
    if (checkEnabled()) {
      let params = Object.values(setFeeReceiversParams);
      console.log(params);
      await execute('setFeeReceivers', params);
    }
  }

  /** Here SetIsDividendExempt function**/


  const setIsFeeExempt = async () => {
    if (checkEnabled()) {
      let params = Object.values(setIsFeeExemptParams);
      console.log(params);
      await execute('setIsFeeExempt', params);
    }
  }

  const setIsTxLimitExempt = async () => {
    if (checkEnabled()) {
      let params = Object.values(setIsTxLimitExemptParams);
      console.log(params);
      await execute('setIsTxLimitExempt', params);
    }
  }

  const setpenaltyFee = async () => {
    if (checkEnabled()) {
      let params = Object.values(setpenaltyFeeParams);
      console.log(params);
      await execute('setpenaltyFee', params);
    }
  }

  const setPenaltyFeeFreeTime = async () => {
    if (checkEnabled()) {
      let params = Object.values(setPenaltyFeeFreeTimeParams);
      console.log(params);
      await execute('setPenaltyFeeFreeTime', params);
    }
  }

  const setPresaleList = async () => {
    if (checkEnabled()) {
      let params = Object.values(setPresaleListParams);
      console.log(params);
      await execute('setPresaleList', params);
    }
  }

  const setPrivateList = async () => {
    if (checkEnabled()) {
      let params = Object.values(setPrivateListParams);
      console.log(params);
      await execute('setPrivateList', params);
    }
  }

  const setSellFee = async () => {
    if (checkEnabled()) {
      let params = Object.values(setSellFeeParams);
      console.log(params);
      await execute('setSellFee', params);
    }
  }

  const setSwapBackSettings = async () => {
    if (checkEnabled()) {
      let params = Object.values(setSwapBackSettingsParams);
      console.log(params);
      await execute('setSwapBackSettings', params);
    }
  }

  const setTxLimit = async () => {
    if (checkEnabled()) {
      let params = Object.values(setTxLimitParams);
      console.log(params);
      await execute('setTxLimit', params);
    }
  }

  const transferOwnership = async () => {
    if (checkEnabled()) {
      let params = Object.values(transferOwnershipParams);
      console.log(params);
      await execute('transferOwnership', params);
    }
  }

  return (
    <div className="container">
      <h1 className="mt-2 text-center">Token Contract Test</h1>
      <p>{browserExtensionStatus}</p>
      {enableButton}
      {accountInfo}
      <Row className="mt-5">
        <Col>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="5">
              <Accordion.Header>setBuyFee(_liquidityBuyFee, _marketingBuyFee, _charityBuyFee, _reflectionBuyFee)</Accordion.Header>
              <Accordion.Body>
                <p><b>Description</b>: Get Holder Fees</p>
                <Row className="mb-1">
                  <Form.Label column lg={4}>_liquidityBuyFee</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="uint256" 
                      value = {setBuyFeeParams._liquidityBuyFee}
                      onChange={(e) => setSetBuyFeeParams({ ...setBuyFeeParams, _liquidityBuyFee: e.target.value })}
                    />
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Form.Label column lg={4}>_marketingBuyFee</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="uint256" 
                       value = {setBuyFeeParams._marketingBuyFee}
                       onChange={(e) => setSetBuyFeeParams({ ...setBuyFeeParams, _marketingBuyFee: e.target.value })}
                    />
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Form.Label column lg={4}>_charityBuyFee</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="uint256" 
                      value = {setBuyFeeParams._charityBuyFee}
                      onChange={(e) => setSetBuyFeeParams({ ...setBuyFeeParams, _charityBuyFee: e.target.value })}
                    />
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Form.Label column lg={4}>_reflectionBuyFee</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="uint256" 
                      value = {setBuyFeeParams._reflectionBuyFee}
                      onChange={(e) => setSetBuyFeeParams({ ...setBuyFeeParams, _reflectionBuyFee: e.target.value })}
                    />
                  </Col>
                </Row>

                <div className="text-end">
                  <Button variant="outline-warning" onClick={setBuyFee}>Transact</Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header>setDistributionCriteria(_minPeriod, _minDistribution)</Accordion.Header>
              <Accordion.Body>
                <p><b>Description</b>: Get Holder Fees</p>
                <Row className="mb-1">
                  <Form.Label column lg={4}>_minPeriod</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="uint256" 
                      value = {setDistributionCriteriaParams._minPeriod}
                      onChange={(e) => setSetDistributionCriteriaParams({ ...setDistributionCriteriaParams, _minPeriod: e.target.value })}
                    />
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Form.Label column lg={4}>_minDistribution</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="uint256" 
                      value = {setDistributionCriteriaParams._minDistribution}
                      onChange={(e) => setSetDistributionCriteriaParams({ ...setDistributionCriteriaParams, _minDistribution: e.target.value })}
                    />
                  </Col>
                </Row>

                <div className="text-end">
                  <Button variant="outline-warning" onClick={setDistributionCriteria}>Transact</Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="7">
              <Accordion.Header>setDistributorSettings(gas)</Accordion.Header>
              <Accordion.Body>
                <p><b>Description</b>: Get Holder Fees</p>
                <Row className="mb-1">
                  <Form.Label column lg={4}>gas</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="uint256" 
                      value = {setDistributorSettingsParams.gas}
                      onChange={(e) => setSetDistributorSettingsParams({ ...setDistributorSettingsParams, gas: e.target.value })}
                    />
                  </Col>
                </Row>

                <div className="text-end">
                  <Button variant="outline-warning" onClick={setDistributorSettings}>Transact</Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="8">
              <Accordion.Header>setFeeReceivers(_liquidityFeeReceiver, _marketingFeeReceiver, _charityFeeReceiver)</Accordion.Header>
              <Accordion.Body>
                <p><b>Description</b>: Get Holder Fees</p>
                <Row className="mb-1">
                  <Form.Label column lg={4}>_liquidityFeeReceiver</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="address" 
                      value = {setFeeReceiversParams.gas}
                      onChange={(e) => setSetFeeReceiversParams({ ...setFeeReceiversParams, _liquidityFeeReceiver: e.target.value })}
                    />
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Form.Label column lg={4}>_marketingFeeReceiver</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="address" 
                      value = {setFeeReceiversParams.gas}
                      onChange={(e) => setSetFeeReceiversParams({ ...setFeeReceiversParams, _marketingFeeReceiver: e.target.value })}
                    />
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Form.Label column lg={4}>_charityFeeReceiver</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="address" 
                      value = {setFeeReceiversParams.gas}
                      onChange={(e) => setSetFeeReceiversParams({ ...setFeeReceiversParams, _charityFeeReceiver: e.target.value })}
                    />
                  </Col>
                </Row>

                <div className="text-end">
                  <Button variant="outline-warning" onClick={setFeeReceivers}>Transact</Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            {/* <Accordion.Item eventKey="9">
              <Accordion.Header>setIsDividendExempt(holder, exempt)</Accordion.Header>
              <Accordion.Body>
                <p><b>Description</b>: Get Holder Fees</p>
                <Row className="mb-1">
                  <Form.Label column lg={4}>holder</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="address" />
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Form.Label column lg={4}>exempt</Form.Label>
                  <Col>
                    <Form.Check type="checkbox" className="mt-2"/>
                  </Col>
                </Row>

                <div className="text-end">
                  <Button variant="outline-warning">Transact</Button>
                </div>
              </Accordion.Body>
            </Accordion.Item> */}

            <Accordion.Item eventKey="10">
              <Accordion.Header>setIsFeeExempt(holder, exempt)</Accordion.Header>
              <Accordion.Body>
                <p><b>Description</b>: Get Holder Fees</p>
                <Row className="mb-1">
                  <Form.Label column lg={4}>holder</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="address" 
                      value = {setIsFeeExemptParams.holder}
                      onChange={(e) => setSetIsFeeExemptParams({ ...setIsFeeExemptParams, holder: e.target.value })}
                    />
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Form.Label column lg={4}>exempt</Form.Label>
                  <Col>
                    <Form.Check type="checkbox" className="mt-2"
                      checked = {setIsFeeExemptParams.exempt}
                      onChange={(e) => setSetIsFeeExemptParams({ ...setIsFeeExemptParams, exempt: e.target.checked })}
                    />
                  </Col>
                </Row>

                <div className="text-end">
                  <Button variant="outline-warning" onClick={setIsFeeExempt}>Transact</Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="11">
              <Accordion.Header>setIsTxLimitExempt(holder, exempt)</Accordion.Header>
              <Accordion.Body>
                <p><b>Description</b>: Get Holder Fees</p>
                <Row className="mb-1">
                  <Form.Label column lg={4}>holder</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="address" 
                      value = {setIsTxLimitExemptParams.holder}
                      onChange={(e) => setSetIsTxLimitExemptParams({ ...setIsTxLimitExemptParams, holder: e.target.value })}
                    />
                  </Col>
                </Row>
                
                <Row className="mb-1">
                  <Form.Label column lg={4}>exempt</Form.Label>
                  <Col>
                    <Form.Check type="checkbox" className="mt-2"
                      checked = {setIsTxLimitExemptParams.exempt}
                      onChange={(e) => setSetIsTxLimitExemptParams({ ...setIsTxLimitExemptParams, exempt: e.target.checked })}
                    />
                  </Col>
                </Row>

                <div className="text-end">
                  <Button variant="outline-warning" onClick={setIsTxLimitExempt}>Transact</Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="12">
              <Accordion.Header>setpenaltyFee(_marketingPenaltyFee, _charityPenaltyFee, _reflectionPeanltyFee)</Accordion.Header>
              <Accordion.Body>
                <p><b>Description</b>: Get Holder Fees</p>
                <Row className="mb-1">
                  <Form.Label column lg={4}>_marketingPenaltyFee</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="uint256" 
                      value = {setpenaltyFeeParams._marketingPenaltyFee}
                      onChange={(e) => setSetpenaltyFeeParams({ ...setpenaltyFeeParams, _marketingPenaltyFee: e.target.value })}
                    />
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Form.Label column lg={4}>_charityPenaltyFee</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="uint256" 
                      value = {setpenaltyFeeParams._charityPenaltyFee}
                      onChange={(e) => setSetpenaltyFeeParams({ ...setpenaltyFeeParams, _charityPenaltyFee: e.target.value })}
                    />
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Form.Label column lg={4}>_reflectionPeanltyFee</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="uint256" 
                      value = {setpenaltyFeeParams._reflectionPeanltyFee}
                      onChange={(e) => setSetpenaltyFeeParams({ ...setpenaltyFeeParams, _reflectionPeanltyFee: e.target.value })}
                    />
                  </Col>
                </Row>

                <div className="text-end">
                  <Button variant="outline-warning" onClick={setpenaltyFee}>Transact</Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

          </Accordion>
          
        </Col>
        <Col>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>setPenaltyFeeFreeTime(_penaltyFreeTime_normal, _penaltyFreeTime_presale, _penaltyFreeTime_privatesale)</Accordion.Header>
              <Accordion.Body>
                <p><b>Description</b>: Get Holder Fees</p>
                <Row className="mb-1">
                  <Form.Label column lg={5}>_penaltyFreeTime_normal</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="uint256" 
                      value = {setPenaltyFeeFreeTimeParams._penaltyFreeTime_normal}
                      onChange={(e) => setSetPenaltyFeeFreeTimeParams({ ...setPenaltyFeeFreeTimeParams, _penaltyFreeTime_normal: e.target.value })}
                    />
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Form.Label column lg={5}>_penaltyFreeTime_presale</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="uint256" 
                      value = {setPenaltyFeeFreeTimeParams._penaltyFreeTime_presale}
                      onChange={(e) => setSetPenaltyFeeFreeTimeParams({ ...setPenaltyFeeFreeTimeParams, _penaltyFreeTime_presale: e.target.value })}
                    />
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Form.Label column lg={5}>_penaltyFreeTime_privatesale</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="uint256" 
                      value = {setPenaltyFeeFreeTimeParams._penaltyFreeTime_privatesale}
                      onChange={(e) => setSetPenaltyFeeFreeTimeParams({ ...setPenaltyFeeFreeTimeParams, _penaltyFreeTime_privatesale: e.target.value })}
                    />
                  </Col>
                </Row>

                <div className="text-end">
                  <Button variant="outline-warning" onClick={setPenaltyFeeFreeTime}>Transact</Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>setPresaleList(useraddrss)</Accordion.Header>
              <Accordion.Body>
                <p><b>Description</b>: Get Holder Fees</p>
                <Row className="mb-1">
                  <Form.Label column lg={4}>useraddrss</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="address" 
                      value = {setPresaleListParams.useraddrss}
                      onChange={(e) => setSetPresaleListParams({ ...setPresaleListParams, useraddrss: e.target.value })}
                    />
                  </Col>
                </Row>

                <div className="text-end">
                  <Button variant="outline-warning" onClick={setPresaleList}>Transact</Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>setPrivateList(useraddrss)</Accordion.Header>
              <Accordion.Body>
                <p><b>Description</b>: Get Holder Fees</p>
                <Row className="mb-1">
                  <Form.Label column lg={4}>useraddrss</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="address" 
                      value = {setPrivateListParams.useraddrss}
                      onChange={(e) => setSetPrivateListParams({ ...setPrivateListParams, useraddrss: e.target.value })}
                    />
                  </Col>
                </Row>

                <div className="text-end">
                  <Button variant="outline-warning" onClick={setPrivateList}>Transact</Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>setSellFee(_liquiditySellFee, _marketingSellFee, _charitySellFee, _reflectionSellFee)</Accordion.Header>
              <Accordion.Body>
                <p><b>Description</b>: Get Holder Fees</p>
                <Row className="mb-1">
                  <Form.Label column lg={4}>_liquiditySellFee</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="uint256" 
                      value = {setSellFeeParams._liquiditySellFee}
                      onChange={(e) => setSetSellFeeParams({ ...setSellFeeParams, _liquiditySellFee: e.target.value })}
                    />
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Form.Label column lg={4}>_marketingSellFee</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="uint256" 
                      value = {setSellFeeParams._marketingSellFee}
                      onChange={(e) => setSetSellFeeParams({ ...setSellFeeParams, _marketingSellFee: e.target.value })}
                    />
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Form.Label column lg={4}>_charitySellFee</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="uint256" 
                      value = {setSellFeeParams._charitySellFee}
                      onChange={(e) => setSetSellFeeParams({ ...setSellFeeParams, _charitySellFee: e.target.value })}
                    />
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Form.Label column lg={4}>_reflectionSellFee</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="uint256" 
                      value = {setSellFeeParams._reflectionSellFee}
                      onChange={(e) => setSetSellFeeParams({ ...setSellFeeParams, _reflectionSellFee: e.target.value })}
                    />
                  </Col>
                </Row>

                <div className="text-end">
                  <Button variant="outline-warning" onClick={setSellFee}>Transact</Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>


            <Accordion.Item eventKey="5">
              <Accordion.Header>setSwapBackSettings(_enabled, _amount)</Accordion.Header>
              <Accordion.Body>
                <p><b>Description</b>: Get Holder Fees</p>

                <Row className="mb-1">
                  <Form.Label column lg={4}>_enabled</Form.Label>
                  <Col>
                    <Form.Check type="checkbox" className="mt-2"
                      checked = {setSwapBackSettingsParams._enabled}
                      onChange={(e) => setSetSwapBackSettingsParams({ ...setSwapBackSettingsParams, _enabled: e.target.checked })}
                    />
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Form.Label column lg={4}>_amount</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="uint256" 
                      value = {setSwapBackSettingsParams._amount}
                      onChange={(e) => setSetSwapBackSettingsParams({ ...setSwapBackSettingsParams, _amount: e.target.value })}
                    />
                  </Col>
                </Row>

                <div className="text-end">
                  <Button variant="outline-warning" onClick={setSwapBackSettings}>Transact</Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header>setTxLimit(amount)</Accordion.Header>
              <Accordion.Body>
                <p><b>Description</b>: Get Holder Fees</p>

                <Row className="mb-1">
                  <Form.Label column lg={4}>amount</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="uint256" 
                      value = {setTxLimitParams.amount}
                      onChange={(e) => setSetTxLimitParams({ ...setTxLimitParams, amount: e.target.value })}
                    />
                  </Col>
                </Row>

                <div className="text-end">
                  <Button variant="outline-warning" onClick={setTxLimit}>Transact</Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="7">
              <Accordion.Header>transferOwnership(address)</Accordion.Header>
              <Accordion.Body>
                <p><b>Description</b>: Get Holder Fees</p>

                <Row className="mb-1">
                  <Form.Label column lg={4}>address</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="address" 
                      value = {transferOwnershipParams.address}
                      onChange={(e) => setTransferOwnershipParams({ ...transferOwnershipParams, address: e.target.value })}
                    />
                  </Col>
                </Row>

                <div className="text-end">
                  <Button variant="outline-warning" onClick={transferOwnership}>Transact</Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            

          </Accordion>
        </Col>
        
      </Row>
      
      </div>
    
  );
}

export default Home;
