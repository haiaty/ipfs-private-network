-- test: dopo aver salvato un testo  su nodo 3, ho stoppato il servizio di ipfs su nodo 3, e provato a prendere il dato salvato dal nodo 1 (usando il suo
CID)

risultato: con le configurazioni di default, ipfs salta, si impalla, rimane bloccato e non riesce a prendere il dato.

allora ho provato a ripartire il nodo 3 che avevo fatto crashare. Risultato? la rete torna a funzionare e
riesce ad ottenere il dato.






conclusioni (momentanee): bisogna avere sempre tutti i nodi online.