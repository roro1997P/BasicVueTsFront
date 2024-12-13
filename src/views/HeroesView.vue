<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Hero {
	id: number;
	name: string;
	description: string;
	thumbnail: {
		path: string;
		extension: string;
	};
	resourceURI: string;
}

const heroes = ref<Hero[]>([]);
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);


const fetchHeroes = async () => {
	isLoading.value = true;
	errorMessage.value = null;

	try {
		const response = await axios.get("http://localhost:5023/api/heroes");
		heroes.value = response.data;

		if (!heroes.value.length) {
			errorMessage.value = "No data found";
		}
	} catch (error) {
		errorMessage.value = "Error fetching heroes";
		console.error("Error fetching heroes: ", error);
	} finally {
		isLoading.value = false;
	}
}

onMounted(fetchHeroes);
</script>

<template>
	<main>
		<h1>Hero List</h1>

		<p v-if="isLoading">Loading heroes...</p>
		<p v-else-if="errorMessage">{{ errorMessage }}</p>

		<div v-else class="hero-grid">
			<div v-for="hero in heroes" :key="hero.id" class="hero-card">
				<div class="image-container">
					<img :src="`${hero.thumbnail.path}.${hero.thumbnail.extension}`" :alt="hero.name" />
				</div>
				<h2>{{ hero.name }}</h2>
				<p>{{ hero.description || "No description available" }}</p>
			</div>
		</div>
  </main>
</template>

<style scoped>
main {
	padding: 1rem;
	font-family: Arial, Helvetica, sans-serif;
}

.hero-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 1rem;
}

.hero-card {
	border: 1px solid #ccc;
	border-radius: 8px;
	padding: 1rem;
	background-color: #fff;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.image-container {
	width: 100%;
	aspect-ratio: 1;
	overflow: hidden;
	border-radius: 8px;
}

.hero-card img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
}

.hero-card h2 {
	font-size: 1.2rem;
	margin: 0.5rem 0;
}

.hero-card p {
	font-size: 0.9rem;
	columns: #666;
}
</style>
