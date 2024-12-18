const vm = Vue.createApp({
    data(){
        return{
            perspective: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0
        }
    },

    methods: {
        resetValues() {
            this.perspective= 0;
            this.rotateX= 0;
            this.rotateY= 0;
            this.rotateZ= 0;
            return;
        },

        async copy() {
            let text = `transform: ${this.box.transform};`
            await navigator.clipboard.writeText(text);

            alert("CSS copied to clipboard!")
        }

    },

    computed: {
        box() {
            return {
                transform: `
                    perspective(${this.perspective}px)
                    rotateX(${this.rotateX}deg)
                    rotateY(${this.rotateY}deg)
                    rotateZ(${this.rotateZ}deg)
                    `
            }
        }
    },

    watch: {

    }



}).mount("#app")
