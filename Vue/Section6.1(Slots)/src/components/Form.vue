<template>
    <form>
        <!--<slot></slot> --> <!--slots are a way to pass down HTML from parent to children components. The slot tags will be replaced by the v-slot template.-->
        <div class="help">
            <slot name="help"></slot> <!--named slots-->
        </div>
        <div class="fields">
            <slot name="fields"></slot>
        </div>
        <div class="buttons">
            <slot name="buttons"></slot>
        </div>
        <div>
            <slot></slot> <!--any element that are not assigned to a specific slot will be put to the unnamed slot by default.-->
        </div>
    </form>
</template>
