import type { SchemaTypeDefinition } from "sanity";

import { post } from "./post";
import { review } from "./review";
import { vacancy } from "./vacancy";
import { teamMember } from "./teamMember";
import { course } from "./course";
import { courseFaq } from "./courseFaq";
import { material } from "./material";

export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  review,
  vacancy,
  teamMember,
  course,
  courseFaq,
  material,
];
