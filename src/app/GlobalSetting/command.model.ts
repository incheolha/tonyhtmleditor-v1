
export class CommandModel{
    public commandName: string;
    public value: string;
    constructor(commandName: string, value: string) {
        this.commandName = commandName;
        this.value = value;
    }
}