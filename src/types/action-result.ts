export type ActionResult<R, E> =
    | {
          success: true;
          result: R;
      }
    | {
          success: false;
          error: E;
      };
