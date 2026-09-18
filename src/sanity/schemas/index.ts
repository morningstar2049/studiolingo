import type { SchemaTypeDefinition } from "sanity";

import { post } from "./post";
import { review } from "./review";
import { vacancy } from "./vacancy";

export const schemaTypes: SchemaTypeDefinition[] = [post, review, vacancy];
