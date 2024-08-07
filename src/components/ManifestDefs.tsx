export default function ManifestDefinitions() {
  return (
    <div className="grid-col border border-base-lighter bg-white padding-3 radius-md">
      <h2 className="font-sans-lg text-normal margin-bottom-2">
        Help: Submission Manifest Fields
      </h2>
      <dl>
        <dt className="font-mono-md padding-bottom-1">
          <strong>Data Stream (data_stream_id)</strong>
        </dt>
        <dd>
          An alphabetical code that identifies the CDC program receiving the
          data. This code is provided during onboarding.
        </dd>
        <hr className="margin-y-2 border-1px border-base-lighter" />
        <dt className="font-mono-md padding-bottom-1">
          <strong>Route (data_stream_route)</strong>
        </dt>
        <dd>
          The name of the folder destination for the data file. Typically this
          will match the submission file format.
        </dd>
        <hr className="margin-y-2 border-1px border-base-lighter" />
        <dt className="font-mono-md padding-bottom-1">
          <strong>Data Producer (data_producer_id)</strong>
        </dt>
        <dd>
          An alphabetical code that identifies the public health authority that
          supplies the data. In cases where the data producer is the same as the
          sender, the value should match the sender_id. In cases where this is
          not provided or known, use a value of &quot;null.&quot;
        </dd>
        <hr className="margin-y-2 border-1px border-base-lighter" />
        <dt className="font-mono-md padding-bottom-1">
          <strong>Data Sender (sender_id)</strong>
        </dt>
        <dd>
          An alphabetical code that identifies the sender, machine, or
          intermediary organization that&apos;s sending data. This code is
          provided during onboarding.
        </dd>
        <hr className="margin-y-2 border-1px border-base-lighter" />
        <dt className="font-mono-md padding-bottom-1">
          <strong>Jurisdiction</strong>
        </dt>
        <dd>
          An alphabetical code that identifies the city, county, state, tribe,
          or territory of the sender. This code is provided during onboarding.
        </dd>
        <hr className="margin-y-2 border-1px border-base-lighter" />
        <dt className="font-mono-md padding-bottom-1">
          <strong>Version</strong>
        </dt>
        <dd>
          The version of the metadata being sent. In all new cases, this field
          value will be &quot;2.0&quot;.
        </dd>
      </dl>
    </div>
  );
}
