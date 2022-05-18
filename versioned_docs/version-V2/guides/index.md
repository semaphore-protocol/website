### What is a relay?

A relay is a third-party who receives a fee for including relayed transactions in the blockchain. (McMenamin, Daza, and Fitz. https://eprint.iacr.org/2022/155.pdf, p.3)

Ethereum transactions are tied to a specific address, and transactions sent from
this address consume Ether to pay for gas. When a signal is broadcast, the
Ethereum address used for the transaction might be used to break the anonymity
of the broadcaster. Semaphore allows signals to be received from any address,
allowing a relayer to broadcast a signal on behalf of a user. Applications might
provide rewards for relayers and implement front-running prevention mechanisms, such as requiring the signals to include the relayer’s address, binding the
signal to that specific address.(https://semaphore.appliedzkp.org/whitepaper-v1.pdf, p.6)