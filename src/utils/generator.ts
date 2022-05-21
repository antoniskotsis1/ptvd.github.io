export class Generator{
    public static generateIndicators() {
        const element =[];
        for (let index = 0; index < 50; index++) {
            element.push( Math.random() * 1000);
        }
        return element;
    }
}