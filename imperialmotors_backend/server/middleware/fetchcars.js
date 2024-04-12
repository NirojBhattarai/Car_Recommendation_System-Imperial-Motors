const recommendCars = async (userPreferences) => {
    try {
        const { fuelEfficiency, comfortLevel, price } = userPreferences;

        // Query the database to retrieve cars based on user preferences
        const query = `
            SELECT *
            FROM cars
            WHERE fuelEfficiency >= $1
            AND comfortLevel >= $2
            AND price <= $3
            ORDER BY RANDOM()
            LIMIT 10;
        `;
        const values = [fuelEfficiency, comfortLevel, price];
        const { rows } = await pool.query(query, values);
        return rows;
    } catch (error) {
        console.error('Error recommending cars:', error);
        throw error;
    }
};

module.exports = { recommendCars };
