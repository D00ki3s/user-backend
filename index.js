const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { SismoConnect, AuthType } = require('@sismo-core/sismo-connect-server');
// const {SismoConnectButton, AuthType, SismoConnectClientConfig, SismoConnectResponse } = require("@sismo-core/sismo-connect-react");

const app = express()
app.use(cors())
app.use(bodyParser.json())

const {account} = "0x0x072d7e87c13bCe2751B5766A0E2280BAD235974f";

const sismoConnectConfig = {
    appId: "0x9820513d88bf47db265d70a430173414",
    devMode: {
      enabled: true,
    }
  };

const sismoConnect = SismoConnect(sismoConnectConfig);

const devGroups = ["0x311ece950f9ec55757eb95f3182ae5e2","0x1cde61966decb8600dfd0749bd371f12","0x7fa46f9ad7e19af6e039aa72077064a1","0x94bf7aea2a6a362e07e787a663271348"]

app.post('/',async function (req, res) {
    console.log(req.body)
    const { response, groups, signature, account } = req.body;
        try {
            const result = await sismoConnect.verify(response, {
            //claims: [{groupId: "0xe9ed316946d3d98dfcd829a53ec9822e"}],
            claims: groups,
            auths: [{authType: AuthType.VAULT}],
            signature: {message: "dookie"},
            });
            console.log("Response verified:", result.response);
            // vaultId = hash(userVaultSecret, appId). 
            // the vaultId is an app-specific, anonymous identifier of a vault
            console.log("VaultId: ", result.getUserId(AuthType.VAULT))
            res.status(200).send(result);
        } catch (e) {
            console.error(e);
            res.status(400).send();
        }

})


app.listen(4500, () => {
    console.log('Server is running on port 4500');
  });