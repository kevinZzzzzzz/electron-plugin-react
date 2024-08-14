import React, { useState, useEffect, memo } from "react";

function HasLayout(props: any) {
  return <>{props.children}</>;
}
export default memo(HasLayout);
