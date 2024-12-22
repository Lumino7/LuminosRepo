<template>
   <div class="result">
          <div class="title"> {{ results[resultIndex].title }}</div> <!-- Computed properties are used directly without ().-->
          <div class="desc">
              {{ results[resultIndex].desc }}
          </div>
    </div>
</template>

<script>
    export default {
        props: ['totalCorrect','results'],
        computed: {
            resultIndex() {
                let index = 0;

                this.results.forEach((e,i) => {
                if (this.totalCorrect >= e.min && this.totalCorrect <= e.max) {
                    index = i;
                    }
                })

                return index;
            }
        }
    }

</script>

<style>

</style>
