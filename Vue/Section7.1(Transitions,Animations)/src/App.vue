<script>
    export default {
        name: "App",
        data() {
            return {
                flag: true,
                numbers: [1,2,3,4,5]
            }
        },
        methods: {
            beforeEnter(el) { //
                console.log("before-enter event fired", el)
            },
            // enter(el, done) { //done is a built-in Vue fn ##THIS METHOD IS FOR ANIMATING WITH JS##
            //     console.log("enter event fired", el)

            //     const animation = el.animate([{transform: "scale3d(0,0,0)"},{}],{ //animate 1st argument takes an array for a series of CSS animations. 2nd item is blank meaning default scale(1)
            //     // 2nd argument is an object of settings.
            //         duration: 1000,
            //     });
            //     animation.onfinish = ()=>{
            //         done(); //tells Vue that the animation is done.
            //     }
            // },
            enter(el) { //done is removed, otherwise, Vue will assume that you want JS to determine when the transition is complete. Now, Vue will use CSS to determine how long the transition lasts.
                console.log("enter event fired", el)


            },
            afterEnter(el) {
                console.log("after-enter event fired", el)
            },
            beforeLeave(el) {
                console.log("before-leave event fired", el)
            },
            // leave(el, done) { //##THIS METHOD IS FOR ANIMATING WITH JS##
            //     console.log("leave event fired", el)

            //     const animation = el.animate([{},{transform: "scale3d(0,0,0)"}],{ //animate 1st argument takes an array for a series of CSS animations. 2nd item is blank meaning default scale(1)
            //     // 2nd argument is an object of settings.
            //         duration: 1000,
            //     });
            //     animation.onfinish = ()=>{
            //         done();
            //     }
            // },
            leave(el) {
                console.log("leave event fired", el)

            },
            afterLeave(el) {
                console.log("after-leave event fired", el)
            },
            addItem() {
                const num = Math.floor(Math.random() * 100 + 1);
                const index = Math.floor(Math.random() * this.numbers.length);
                this.numbers.splice(index, 0, num);
            },
            removeItem(index) {
                this.numbers.splice(index, 1);
            }
        }
    }
</script>

<template>
    <button type="button" @click= "flag=!flag">Toggle</button> <!-- flag=!flag toggles a Boolean to the opposite of the current value. -->

    <!-- ANIMATING WITH CSS TRANSITIONS (css transitions: 2 states only, requires a trigger/event.)-->
    <!-- For complex animations that involve multiple keyframes.
    For animations that loop or run indefinitely (e.g., spinners). -->
    <!-- <transition name="fade" mode="out-in" appear> -->
        <!--this tag applies 6 classes to it's contents: v-enter-from, v-enter-active, v-enter-to, v-leave-from, v-leave-active, and v-leave-to. -->
        <!-- These are modified if you put a name class into fade-enter-from, etc. -->
        <!-- mode="out-in" makes it so that the outgoing element gets animated first before animating the incoming element.-->
        <!-- appear makes the animation play on the initial load. -->
        <!-- <h2 v-if="flag" key="main">Hello World!</h2>
        <h2 v-else key="secondary">Another Hello!</h2>
    </transition> -->

    <!-- ANIMATING WITH CSS ANIMATIONS (css animations: can define multiple steps, uses keyframes, can loop.)-->
    <!-- <transition name="zoom" appear>
        <h2 v-if="flag">Hello</h2>
    </transition> -->

    <!-- ANIMATING WITH JS-->
    <!--For complex, interactive, or state-dependent animations.
    When you need to chain, pause, or reverse animations.
    When integrating third-party animation libraries or handling non-CSS elements.
    For custom, precise easing and control over timing.-->
    <!--ANIMATING WITH JS+CSS: recommended, CSS for animation, JS for logic.-->
    <!-- <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    :css="true"
    name="fade"> -->
    <!-- Vue automatically sends the element (el) to the method.-->
    <!-- @enter-cancelled and @leave-cancelled are triggered when enter/leave animations are cancelled.-->
    <!-- css=false tells vue that you don't have css animations, so vue doesn't have to check it = less resources-->
    <!-- css=true if you're using CSS+JS. Also add a name class. This will re-use the fade CSS transitions.-->
        <!-- <h2 v-if="flag">Hey!</h2>
    </transition> -->

    <!-- ANIMATING LIST ITEMS -->
    <button type="button" @click="addItem">Add</button>

    <ul>
        <transition-group name="fade"> <!--for animating items in a loop. transition tag doesn't work with list items. Virtually same features, except no mode property.-->
            <li v-for="(number, index) in numbers" :key="number" @click="removeItem(index)">
                {{ number }}
            </li>
        </transition-group>
    </ul>

</template>

<style>
li{
    font-size: 22px;
    cursor: pointer;
}

h2{
    width: 400px;
    padding: 20px;
    margin: 20px;
}

/* CSS TRANSITIONS */
.fade-enter-from { /* the initial state of the element when it appears on the DOM*/
    opacity: 0;
}

.fade-enter-active { /* the entire animation including from and to*/
    transition: all 1s linear;
}

.fade-leave-to { /* the final state of the element right before it leaves the DOM*/
    transition: all 1s linear;
    opacity: 0;
}

.fade-move { /* special class applied by transition-group tag to elements in the list when they change position. */
    transition: all 1s linear; /* slows down the movement of other elements when items are added so they don't "snap" */
}

.fade-leave-active {
    position: absolute; /* removes the element from the document flow, ensures that the element does not occupy space in the layout during the transition, letting the move animation happen. */
}


/* CSS ANIMATION*/
@keyframes zoom-in {
    from {
        transform: scale(0,0)
    }
    to {
        transform: scale(1,1)
    }
}

@keyframes zoom-out { 
    from {
        transform: scale(1,1)
    }
    to {
        transform: scale(0,0)
    }
}

.zoom-enter-active{
    animation: zoom-in 1s linear forwards;
    transition: all 1s linear;
}

.zoom-leave-active{
    animation: zoom-out 1s linear forwards;
    transition: all 1s linear;
}

.zoom-enter-from{ /*No need to set the opacity to 1 in a enter-to because that is the default value anyway. */
    opacity:0;
}

.zoom-leave-to{
    opacity:0;
}
</style>

