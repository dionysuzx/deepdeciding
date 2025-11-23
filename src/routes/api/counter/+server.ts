import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

// GET - Get current counter value
export const GET: RequestHandler = async ({ platform }) => {
  if (!platform?.env?.DB) {
    return json({ error: "Database not available" }, { status: 500 });
  }

  try {
    const result = await platform.env.DB.prepare(
      "SELECT count FROM counter WHERE id = 1",
    ).first<{
      count: number;
    }>();

    return json({ count: result?.count ?? 0 });
  } catch (error) {
    console.error("Error fetching counter:", error);
    return json({ error: "Failed to fetch counter" }, { status: 500 });
  }
};

// POST - Increment counter
export const POST: RequestHandler = async ({ platform }) => {
  if (!platform?.env?.DB) {
    return json({ error: "Database not available" }, { status: 500 });
  }

  try {
    // Increment the counter
    await platform.env.DB.prepare(
      "UPDATE counter SET count = count + 1 WHERE id = 1",
    ).run();

    // Get the new value
    const result = await platform.env.DB.prepare(
      "SELECT count FROM counter WHERE id = 1",
    ).first<{
      count: number;
    }>();

    return json({ count: result?.count ?? 0 });
  } catch (error) {
    console.error("Error incrementing counter:", error);
    return json({ error: "Failed to increment counter" }, { status: 500 });
  }
};

// DELETE - Reset counter
export const DELETE: RequestHandler = async ({ platform }) => {
  if (!platform?.env?.DB) {
    return json({ error: "Database not available" }, { status: 500 });
  }

  try {
    await platform.env.DB.prepare(
      "UPDATE counter SET count = 0 WHERE id = 1",
    ).run();

    return json({ count: 0 });
  } catch (error) {
    console.error("Error resetting counter:", error);
    return json({ error: "Failed to reset counter" }, { status: 500 });
  }
};
