/**
 * ShelfTalk REST API Service Client
 * Connects the React presentation layer to the Node.js/Express backend & SQLite database.
 * Provides automatic fallback to LocalStorage if the server is offline or running in standalone mode.
 */

const API_BASE = '/api';

export const ApiService = {
  // Health check
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_BASE}/health`, { method: 'GET' });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Books
  getBooks: async (genre, search) => {
    const params = new URLSearchParams();
    if (genre && genre !== 'All') params.append('genre', genre);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE}/books?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch books from API');
    const json = await res.json();
    return json.data;
  },

  getBookById: async (id) => {
    const res = await fetch(`${API_BASE}/books/${id}`);
    if (!res.ok) throw new Error('Book not found');
    const json = await res.json();
    return json.data;
  },

  // Reviews
  getReviews: async (bookId) => {
    const res = await fetch(`${API_BASE}/books/${bookId}/reviews`);
    if (!res.ok) throw new Error('Failed to fetch reviews');
    const json = await res.json();
    return json.data;
  },

  submitReview: async (reviewData) => {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || 'Failed to submit review');
    }
    return await res.json();
  },

  // Reading Circles
  getCircles: async () => {
    const res = await fetch(`${API_BASE}/circles`);
    if (!res.ok) throw new Error('Failed to fetch circles');
    const json = await res.json();
    return json.data;
  },

  updateCircleProgress: async (circleId, currentPage, totalPages) => {
    const res = await fetch(`${API_BASE}/circles/${circleId}/progress`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPage, totalPages })
    });
    if (!res.ok) throw new Error('Failed to update progress');
    return await res.json();
  },

  // Chapter Discussions
  getDiscussions: async (circleId, chapterId) => {
    const params = new URLSearchParams({ circleId });
    if (chapterId && chapterId !== 'all') params.append('chapterId', chapterId);

    const res = await fetch(`${API_BASE}/discussions?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch discussions');
    const json = await res.json();
    return json.data;
  },

  submitDiscussionPost: async (postData) => {
    const res = await fetch(`${API_BASE}/discussions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    });
    if (!res.ok) throw new Error('Failed to post to discussion forum');
    return await res.json();
  },

  // Quotes
  getQuotes: async () => {
    const res = await fetch(`${API_BASE}/quotes`);
    if (!res.ok) throw new Error('Failed to fetch quotes');
    const json = await res.json();
    return json.data;
  },

  addQuote: async (quoteData) => {
    const res = await fetch(`${API_BASE}/quotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quoteData)
    });
    if (!res.ok) throw new Error('Failed to save quote');
    return await res.json();
  },

  deleteQuote: async (id) => {
    const res = await fetch(`${API_BASE}/quotes/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete quote');
    return await res.json();
  },

  // Reading Goal
  getGoal: async () => {
    const res = await fetch(`${API_BASE}/goal`);
    if (!res.ok) throw new Error('Failed to fetch goal');
    const json = await res.json();
    return json.data;
  },

  updateGoal: async (goalData) => {
    const res = await fetch(`${API_BASE}/goal`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goalData)
    });
    if (!res.ok) throw new Error('Failed to update goal');
    return await res.json();
  },

  // Reset to default seed
  resetDemoData: async () => {
    const res = await fetch(`${API_BASE}/reset`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to reset backend database');
    return await res.json();
  }
};
