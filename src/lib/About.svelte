<script>
import { CONTACT_EMAIL, CONTACT_MATRIX, CONTACT_NAME } from "$lib/config";
</script>

<div class="text-base">
  <p>
    The <em>Fetal Reconstruction UI</em> is an experimental project
    providing an easy-to-use interface for running the FNNDSC's
    "fetal MRI reconstruction pipeline" on <em>ChRIS</em>.
  </p>
  <p>
    Contact: {CONTACT_NAME}
    &lt;<a class="text-primary-800 dark:text-primary-600" href={`mailto:${CONTACT_EMAIL}`}>
    {CONTACT_EMAIL}
  </a>&gt;
    {' '}
    or on <a class="text-primary-800 dark:text-primary-600" href={CONTACT_MATRIX}>
    Matrix (preferred)
  </a>.
  </p>
</div>
