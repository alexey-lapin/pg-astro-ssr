import {Context} from "https://edge.netlify.com";

// Search for the placeholder
const regex = /COUNTRYNAME/i;

export default async (request: Request, context: Context) => {
    console.log("new request context" + JSON.stringify(context))

    // Get the page content
    const response = await context.next();
    let page = await response.text();

    let content: String = response.headers.get("Content-Type") ?? "";
    if (content.toLowerCase().includes("text/html")) {
        // Replace the content
        const countryName = context.geo?.country?.name || "somewhere in the world";
        page = page.replace(regex, countryName);
        return new Response(page, response);
    }

};
 