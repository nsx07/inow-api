export class ConvertFileToString  {

    components! : Array<string[]>;
    filePath! : string;
    content! : string;
    file! : string;

    constructor(_filePath : string) {
        this.filePath = _filePath;
        return this;
    }

    async getFile() {
        await Deno.readTextFile(this.filePath)
            .then(res => {
                this.content = res;
            })    
            .catch(err => {
                this.content = "Page not found"
                }
            )

        // console.debug(this.content);
        
        return this.content
                ? this.content
                : "Page not found"
    }

}