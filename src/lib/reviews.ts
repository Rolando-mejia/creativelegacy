import { useState, useEffect } from 'react';

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const REVIEWS_STORAGE_KEY = 'creative-legacy-reviews';

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Cargar reseñas del localStorage al inicializar
  useEffect(() => {
    const savedReviews = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (savedReviews) {
      try {
        const parsedReviews = JSON.parse(savedReviews);
        setReviews(parsedReviews);
      } catch (error) {
        console.error('Error parsing reviews from localStorage:', error);
        setReviews([]);
      }
    } else {
      // Agregar algunas reseñas de ejemplo
      const exampleReviews: Review[] = [
        {
          id: '1',
          name: 'María González',
          rating: 5,
          comment: 'Excelente trabajo en el diseño de mi sitio web. El equipo de Creative Legacy superó mis expectativas.',
          date: new Date('2024-09-15').toISOString()
        },
        {
          id: '2',
          name: 'Carlos Mendoza',
          rating: 5,
          comment: 'Muy profesionales y creativos. La identidad visual que crearon para mi empresa es perfecta.',
          date: new Date('2024-09-10').toISOString()
        },
        {
          id: '3',
          name: 'Ana Rodríguez',
          rating: 4,
          comment: 'Gran experiencia trabajando con ellos. Muy atentos a los detalles y siempre cumpliendo con los tiempos.',
          date: new Date('2024-09-05').toISOString()
        }
      ];
      setReviews(exampleReviews);
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(exampleReviews));
    }
  }, []);

  // Guardar reseñas en localStorage cuando cambien
  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    }
  }, [reviews]);

  const addReview = (name: string, rating: number, comment: string) => {
    const newReview: Review = {
      id: Date.now().toString(),
      name,
      rating,
      comment,
      date: new Date().toISOString()
    };

    setReviews(prevReviews => [newReview, ...prevReviews]);
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((total / reviews.length) * 10) / 10;
  };

  return {
    reviews,
    addReview,
    getAverageRating,
    totalReviews: reviews.length
  };
};