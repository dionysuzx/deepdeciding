import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

interface Topic {
  id: number;
  title: string;
  description: string;
  creator_address: string;
  bounty: number | null;
  created_at: string;
}

// GET - List all topics
export const GET: RequestHandler = async ({ platform }) => {
  if (!platform?.env?.DB) {
    return json({ error: "Database not available" }, { status: 500 });
  }

  try {
    const result = await platform.env.DB.prepare(
      "SELECT * FROM topics ORDER BY created_at DESC",
    ).all<Topic>();

    return json({ topics: result.results ?? [] });
  } catch (error) {
    console.error("Error fetching topics:", error);
    return json({ error: "Failed to fetch topics" }, { status: 500 });
  }
};

// POST - Create a new topic
export const POST: RequestHandler = async ({ platform, request }) => {
  if (!platform?.env?.DB) {
    return json({ error: "Database not available" }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { title, description, creator_address, bounty } = body;

    // Validate inputs
    if (!title || !description || !creator_address) {
      return json(
        { error: "Title, description, and creator address are required" },
        { status: 400 },
      );
    }

    if (title.length > 50) {
      return json(
        { error: "Title must be 50 characters or less" },
        { status: 400 },
      );
    }

    if (description.length > 155) {
      return json(
        { error: "Description must be 155 characters or less" },
        { status: 400 },
      );
    }

    if (bounty !== undefined && bounty !== null && bounty < 0) {
      return json(
        { error: "Bounty must be a positive number" },
        { status: 400 },
      );
    }

    // Insert the topic
    const result = await platform.env.DB.prepare(
      "INSERT INTO topics (title, description, creator_address, bounty) VALUES (?, ?, ?, ?) RETURNING *",
    )
      .bind(title, description, creator_address, bounty || null)
      .first<Topic>();

    return json({ topic: result }, { status: 201 });
  } catch (error) {
    console.error("Error creating topic:", error);
    return json({ error: "Failed to create topic" }, { status: 500 });
  }
};
