export class SecurityStorage {

    private ASCII = `1234567890QWERTYUIOPASDFGHJKLÇZXCVBNMpoiuytrewqasdfghjklçmnbvcxz!@#$%&*()_`
    public key! : number;


    constructor() {
        do this.key = Math.round(new Date().getMilliseconds()/10);
        while (this.key < 1 || this.key > 73) 

        return this
    }

    /**
     * 
     * @param A word that wants to encrypt 
     * @returns A encrypted version of the word given in parameter using the current milisecond as the key
     */
    encrypt(word : string) : string {
        let neword = "";
        for (let l = 0; l < word.length; l++) {
            let index = this.ASCII.indexOf(word[l]) - this.key
            if (index < 0) index = this.ASCII.indexOf(word[l]) + (this.ASCII.length - this.key)
            neword += this.ASCII[index]
        } return neword
    }

    /**
     * 
     * @param word : string || A encrypted word 
     * @param key : number || A key to decrypt the word
     * @returns A decrypted version of the encrypted word given in parameter using the given key to decipher
     */
    decrypt(word : string, key : number) : string {
        let neword = "";
        for (let l = 0; l < word.length; l++){
            let index = this.ASCII.indexOf(word[l])+key
            // const indexASCII = index-this.ASCII.length+key
            if (index >= this.ASCII.length) index = this.ASCII.indexOf(word[l]) - (this.ASCII.length - key)
            neword += this.ASCII[index]
        } return neword
    }
}
