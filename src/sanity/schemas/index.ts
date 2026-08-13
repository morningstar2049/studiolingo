import type { SchemaTypeDefinition } from "sanity";

import { post } from "./post";
import { review } from "./review";

export const schemaTypes: SchemaTypeDefinition[] = [post, review];
